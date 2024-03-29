---
layout: post
title: ! "[CTFd] CTFd 설치"
categories: [CTFd]
excerpt: " "
comments: true
share: true
tags:
  - CTFd
  - Ubuntu
  - install
---

## How to install CTFd on Ubuntu 16.04
### 환경: Ubuntu 16.04 LTS
서버에 아무 것도 설치 및 세팅이 되지 않은 상태로 시작하였다.

`https://github.com/CTFd/CTFd/wiki/Getting-Started`

```
1. apt-get install git
2. git clone https://github.com/CTFd/CTFd.git
3. cd CTFd
4. apt install docker-compose
```
★ ERROR 발생
```
ERROR: The Compose file './docker-compose.yml' is invalid because:
networks.internal value Additional properties are not allowed ('internal' was unexpected)
```

하라는 대로 했는데 위와 같은 에러가 떴다.
CTFd 디렉토리에 있는 docker-compose.yml 파일을 수정해주면 되는데...

에러 해결이 안돼서 구글링을 하다가
https://www.youtube.com/watch?v=b1KdAVFAqio
위 영상의 유투버분이 올려주신 setup 코드 하나로 설치가 순식간에 됐다!

setup.sh link >> **https://drive.google.com/file/d/0B6CGvn6fJuRnWUM2M0lsZW5Kb00/view**

기존에 설치된 CTFd는 삭제했고 제공해주시는 script파일을 서버에 복붙, 권한 설정을 해준 후 ./(파일명).sh 를 해주면 된다.

정말 금방 끝나고 에러 한 번 나지 않았다.

![](/assets/posts/ctfd/ctfd_setup.png)

설치가 다 된 후 웹에서 CTFd 폴더로 들어가면 setup 페이지가 뜬다. 
