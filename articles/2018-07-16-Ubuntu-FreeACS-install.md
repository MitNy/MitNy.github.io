---
layout: post
title: ! "[FreeACS] Ubuntu에 FreeACS 설치하기"
categories: [FreeACS]
excerpt: " "
comments: true
share: true
tags:
  - FreeACS
  - Ubuntu
  - install
---

## How to install FreeACS on Ubuntu 16.04
### 환경 : Ubuntu 16.04 LTS

[참고](https://github.com/freeacs/freeacs/wiki/Get-started)

```
sudo apt-get update
sudo apt-get install tomcat7
sudo wget https://raw.githubusercontent.com/freeacs/freeacs/master/scripts/install.sh -v -O install.sh && chmod +x install.sh && sudo ./install.sh;
```
스크립트를 실행시키면 설치가 시작된다
![](/assets/posts/freeacs/freeacs_install.png)

보통 우분투에서 무언갈 설치할 때 (Y/n)이 뜰 경우 Y가 default값이었으나
freeacs 설치 스크립트에선 꼭 y를 입력하고 엔터를 쳐줘야 설치가 된다.

mysql root 패스워드 설정을 해주는 부분이 나타나면 원하는 패스워드를 입력해주면 된다.
![](/assets/posts/freeacs/freeacs_mysql_pw2.jpg)

스크립트가 다 실행되고 나면 설치는 90% 되었으나, 나머지는 Fusion Installation.pdf를 보고 하라고 한다.
![](/assets/posts/freeacs/freeacs_install_90.png)

설치된 폴더에 가보면 다음과 같은 파일들이 존재한다.
![](/assets/posts/freeacs/freeacs_file.png)

## Fusion Installation.pdf
노란색으로 색칠된 부분은 옵션이지만 Comment를 읽고 넘어가는 것이 좋다고 한다.

![](/assets/posts/freeacs/freeacs_install_1.png)
![](/assets/posts/freeacs/freeacs_install_2.png)
![](/assets/posts/freeacs/freeacs_install_3.png)
![](/assets/posts/freeacs/freeacs_install_4.png)
![](/assets/posts/freeacs/freeacs_install_5.png)
![](/assets/posts/freeacs/freeacs_install_6.png)
![](/assets/posts/freeacs/freeacs_install_7.png)
![](/assets/posts/freeacs/freeacs_install_8.png)
![](/assets/posts/freeacs/freeacs_install_9.png)
![](/assets/posts/freeacs/freeacs_install_10.png)
![](/assets/posts/freeacs/freeacs_install_11.png)


```
bind-address=0.0.0.0
max_allowed_packet=32M
innodb_buffer_pool_size=1024M
service mysql restart
,${catalina.base}/common,${catalina.base}/common/*.properties
AUTHBIND=yes
JAVA_OPTS="-Djava.awt.headless=true -Xmx768m -XX:+UseConcMarkSweepGC"
/var/lib/tomcat7
service tomcat7 restart
wget localhost
wget localhost/web
wget localhost/tr069
```

설정을 다 마치고 localhost/web 또는 ip/web에 들어가보면 로그인 페이지를 볼 수 있다.
![](/assets/posts/freeacs/freeacs_login.png)
`ID: admin / PW: freeacs` 로 로그인 하면 된다.
로그인을 하고 들어가면 아래와 같은 페이지를 볼 수 있다.
![](/assets/posts/freeacs/freeacs_webpage.png)

`freeacs MySQL ID:acs / PW:acs`
