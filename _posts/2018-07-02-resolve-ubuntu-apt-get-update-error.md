---
layout: post
title: ! "[Ubuntu] How to fix apt-get update error on Ubuntu 16.04"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
tags:
  - apt-get update
  - Ubuntu
  - error
---

### 환경: Ubuntu 16.04 LTS
### VMware Workstation 12 pro

우분투 환경에서 apt-get update 시 아래와 같은 에러가 날 때가 있다.
인터넷 연결이 제대로 되어 있지 않아서 그렇다.

```
Err:1 http://security.ubuntu.com/ubuntu xenial-security InRelease
  Temporary failure resolving 'security.ubuntu.com'
Err:2 http://us.archive.ubuntu.com/ubuntu xenial InRelease
  Temporary failure resolving 'us.archive.ubuntu.com'
Err:3 http://us.archive.ubuntu.com/ubuntu xenial-updates InRelease
  Temporary failure resolving 'us.archive.ubuntu.com'
Err:4 http://us.archive.ubuntu.com/ubuntu xenial-backports InRelease
  Temporary failure resolving 'us.archive.ubuntu.com'
Reading package lists... Done
W: Failed to fetch http://us.archive.ubuntu.com/ubuntu/dists/xenial/InRelease  Temporary failure resolving 'us.archive.ubuntu.com'
W: Failed to fetch http://us.archive.ubuntu.com/ubuntu/dists/xenial-updates/InRelease  Temporary failure resolving 'us.archive.ubuntu.com'
W: Failed to fetch http://us.archive.ubuntu.com/ubuntu/dists/xenial-backports/InRelease  Temporary failure resolving 'us.archive.ubuntu.com'
W: Failed to fetch http://security.ubuntu.com/ubuntu/dists/xenial-security/InRelease  Temporary failure resolving 'security.ubuntu.com'
W: Some index files failed to download. They have been ignored, or old ones used instead.
```

![]({{ site.baseurl }}/assets/posts/ubuntu/apt-get-error.png)

VMware 에서 Virtual Machine을 생성할 때 따로 설정을 바꿔주지 않으면 Network connection이 **NAT**로 설정되어 있다.
보통 이 경우일 때 위와 같은 에러가 난다.

**Bridged** 방식으로 변경해주고 잠시 기다리면 네트워크 연결이 되면서 정상적으로 apt-get update를 사용할 수 있다.
![]({{ site.baseurl }}/assets/posts/ubuntu/apt-get-network.png)


