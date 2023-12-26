---
title: '네이버 클라우드 Rocky Linux 패키지 업데이트 미러 사이트 에러 해결'
description: '네이버 클라우드에서 yum, dnf update 할 때... All mirrors were tried'
date: '2023-12-21'
---

네이버 클라우드에서 Rocky Linux 8.8 버전을 사용하고 있는데<br>
`yum update` 같이 패키지 업데이트를 하려고 하면 에러가 떴다...<br>
에러 메시지를 보면 미러 사이트에서 특정 repository에 대한 메타데이터를 받아오질 못하고 있고<br>
모든 미러 사이트에서 404 에러가 뜨며 다운로드를 실패했다는 것이다.

```bash
Rocky Linux 8.8 - Extras    
Errors during downloading metadata for repository 'extras':
  - Status code: 404 for https://rocky-linux-asia-southeast1.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.160.39.155)
  - Status code: 404 for https://rocky-linux-me-west1.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.149.26.62)
  - Status code: 404 for https://rocky-linux-asia-northeast1.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.160.117.186)
  - Status code: 404 for https://rocky-linux-asia-east2.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 35.241.40.125)
  - Status code: 404 for https://rocky-linux-asia-northeast3.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 35.186.196.188)
  - Status code: 404 for https://rocky-linux-asia-northeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.107.160.108)
  - Status code: 404 for https://rocky-linux-asia-south1.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.120.3.13)
  - Status code: 404 for https://rocky-linux-asia-east1.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 35.186.202.231)
  - Status code: 404 for https://rocky-linux-asia-southeast2.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.111.41.84)
  - Status code: 404 for https://rocky-linux-asia-south2.production.gcp.mirrors.ctrliq.cloud/pub/rocky//8.8/extras/x86_64/os/repodata/repomd.xml (IP: 34.149.203.6)
Error: Failed to download metadata for repo 'extras': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo

Rocky Linux 8.8 - PowerTools
Errors during downloading metadata for repository 'powertools':
  - Status code: 404 for http://dl.rockylinux.org/pub/rocky/8.8/PowerTools/x86_64/os/repodata/repomd.xml (IP: 151.101.198.132)
Error: Failed to download metadata for repo 'powertools': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

<br>

실제로 에러 메시지에 뜨는 주소로 접근해도 에러가 뜬다.<br>
<img src="/posts/ncp-rocky-mirror-404-error/repo-nginx-error.png" width="500px"/>

<br>
Extras와 PowerTools 이 repository에서만 발생하는 에러여서<br>
다른 repository의 .repo 파일들을 확인했는데 차이점이 있었다.<br>

`/etc/yum.repos.d` 디렉토리에 패키지 관련 .repo 파일들이 있는데<br>
Rocky와 관련된 파일들 중 `Rocky-BaseOS.repo`와 문제가 되고 있는 `Rocky-Extras.repo` 둘을 비교해보면 baseurl이 다름을 알 수 있다.<br>

```bash
# Rocky-BaseOS.repo
#
# The mirrorlist system uses the connecting IP address of the client and the
# update status of each mirror to pick current mirrors that are geographically
# close to the client.  You should use this for Rocky updates unless you are
# manually picking other mirrors.
#
# If the mirrorlist does not work for you, you can try the commented out
# baseurl line instead.

[baseos]
name=Rocky Linux $releasever - BaseOS
baseurl=http://repo.ncloud.com/rocky/$releasever/BaseOS/$basearch/os/
# mirrorlist=https://mirrors.rockylinux.org/mirrorlist?arch=$basearch&repo=BaseOS-$releasever
gpgcheck=1
enabled=1
countme=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rockyofficial
```

<br>

`Rocky-BaseOS.repo`의 baseurl은 `repo.ncloud.com`으로 네이버 클라우드의 자체 repository로 되어있다.<br>
하지만 `Rocky-Extras.repo` 파일의 baseurl은 주석 처리가 되어 있고<br>
`mirrors.rockylinux.org`로 mirrorlist가 추가되어 있다.<br>

```bash
# Rocky-Extras.repo
#
# The mirrorlist system uses the connecting IP address of the client and the
# update status of each mirror to pick current mirrors that are geographically
# close to the client.  You should use this for Rocky updates unless you are
# manually picking other mirrors.
#
# If the mirrorlist does not work for you, you can try the commented out
# baseurl line instead.

[extras]
name=Rocky Linux $releasever - Extras
mirrorlist=https://mirrors.rockylinux.org/mirrorlist?arch=$basearch&repo=extras-$releasever
#baseurl=http://dl.rockylinux.org/$contentdir/$releasever/extras/$basearch/os/
gpgcheck=1
enabled=1
countme=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rockyofficia
```


<br>

mirrorlist를 제거하거나 주석 처리한 후 `Rocky-BaseOS.repo`와 동일하게<br>
baseurl을 네이버 클라우드 repository로 변경해주면 된다.<br>
`baseurl=http://repo.ncloud.com/rocky/$releasever/BaseOS/$basearch/os/` 여기에서<br>
`BaseOS`만 각 파일에 맞게 수정해주면 되는데 `Extras`가 아닌 `extras`를 입력해주어야 한다.<br>

`baseurl=http://repo.ncloud.com/rocky/$releasever/extras/$basearch/os/`



Extras와 함께 에러가 발생한 PowerTools는 이름 그대로 입력해주면 된다.<br>
```bash {13, 14}
# Rocky-PowerTools.repo
#
# The mirrorlist system uses the connecting IP address of the client and the
# update status of each mirror to pick current mirrors that are geographically
# close to the client.  You should use this for Rocky updates unless you are
# manually picking other mirrors.
#
# If the mirrorlist does not work for you, you can try the commented out
# baseurl line instead.

[powertools]
name=Rocky Linux $releasever - PowerTools
#mirrorlist=https://mirrors.rockylinux.org/mirrorlist?arch=$basearch&repo=PowerTools-$releasever
baseurl=http://repo.ncloud.com/rocky/$releasever/PowerTools/$basearch/os/
gpgcheck=1
enabled=0
countme=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rockyofficial
```


<br>
baseurl 수정 후 업데이트 성공적!
