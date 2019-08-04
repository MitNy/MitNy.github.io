---
layout: post
title: ! "[WEB] APM 취약한 서버 세팅하기"
categories: [WEB]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - Apache
  - PHP
  - MySQL
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/39_clear.png)

### 세팅 환경
- docker(Ubuntu 18.04)
- Apache 2.2.32

### Docker 이미지 다운로드 및 컨테이너 실행

```bash
docker puill ubuntu
docker run -it -d -p 3333:88 --name web ubuntu
docker exec -it [Container ID] /bin/bash
```

### 필수 라이브러리 설치

```bash
apt-get install wget
```

### zlib 설치

```bash
apt-get install build-essential
wget http://www.zlib.net/zlib-1.2.11.tar.gz
tar -xvf zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure --prefix=/usr/local
make
make install
```

### Apache 구버전 설치
* 구버전 아카이브: [http://mirror.23media.de/apache/httpd/](http://mirror.23media.de/apache/httpd/)

```bash
wget http://mirror.23media.de/apache/httpd/httpd-2.2.32.tar.gz
tar -xvf httpd-2.2.32.tar.gz
cd httpd-2.2.32
./configure --prefix=/usr/local/apache2 --enable-mods-shared=all --enable-deflate --enable-proxy --enable-proxy-balancer --enable-proxy-http
make
make install
```

### Apache 서버 설정
1. /usr/local/apache2/conf/httpd.conf 변경

```bash
Listen 88   # 포트 설정(default:80)
ServerName [Domain or IP] # ServerName 설정 
```

2. /usr/local/apache2/conf/extra/httpd-vhosts.conf 변경

```bash
NameVirtualHost *:88 # 위에서 설정한 포트로 변경
<VirtualHost *:88> ~~ # VirtualHost 부분 모두 위에서 설정한 포트로 변경
```

3. Apache 재시작

`/usr/local/apache2/bin/apachectl start`


### Apache 동작 확인
![]({{ site.baseurl }}/assets/posts/web/docker-apache-run.png)

### PHP 구버전 설치

