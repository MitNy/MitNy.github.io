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
docker run -it -d -p 3333:80 --name web ubuntu
docker exec -it [Container ID] /bin/bash
```

컨테이너를 종료하지 않고 쉘에서 빠져나오려면 `Ctrl+P`, `Ctrl+Q`를 차례대로 누르면 된다.

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
/usr/local/apache2/bin/apachectl start
```

### Apache 동작 확인
![]({{ site.baseurl }}/assets/posts/web/docker-apache-run.png)

### Dockerfile로 만들기

```
FROM ubuntu:18.04

RUN apt-get update \
	&& apt-get upgrade \
	&&apt-get install -y build-essential \
	&& apt-get install -y wget \
	&& wget http://www.zlib.net/zlib-1.2.11.tar.gz \
	&& tar -xvf zlib-1.2.11.tar.gz \ 
	&& cd zlib-1.2.11 \
	&& ./configure --prefix=/usr/local \
	&& make \
	&& make install \
	&& wget http://mirror.23media.de/apache/httpd/httpd-2.2.32.tar.gz \
	&& tar -xvf httpd-2.2.32.tar.gz \
	&& cd httpd-2.2.32 \ 
	&& ./configure --prefix=/usr/local/apache2 --enable-mods-shared=all --enable-deflate --enable-proxy --enable-proxy-balancer --enable-proxy-http \
	&& make \
	&& make install

EXPOSE 80

CMD ["/usr/local/apache2/bin/apachectl","-DFOREGROUND"]
```

### PHP 구버전 설치

