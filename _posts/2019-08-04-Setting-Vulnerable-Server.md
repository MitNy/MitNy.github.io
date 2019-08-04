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


### 세팅 환경
- docker(Ubuntu 18.04)
- Apache 2.2.32
- php 4.4.9

### Docker 이미지 다운로드 및 컨테이너 실행

```bash
docker pull ubuntu
docker run -it -d -p 3333:80 --name web ubuntu
docker exec -it [Container ID] /bin/bash
```

컨테이너를 종료하지 않고 쉘에서 빠져나오려면 `Ctrl+P`, `Ctrl+Q`를 차례대로 누르면 된다.

### apt 업데이트 및 필수 라이브러리 설치

```bash
apt-get update
apt-get upgrade
apt-get install -y wget
apt-get install -y vim
apt-get install -y build-essential
```

### zlib 설치

```bash
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
apt-get install -y flex
apt-get install -y bison
wget http://mirror.23media.de/apache/httpd/httpd-2.2.32.tar.gz
tar -xvf httpd-2.2.32.tar.gz
cd httpd-2.2.32
./configure --prefix=/usr/local/apache2 --enable-so
make
make install
/usr/local/apache2/bin/apachectl start
```

### Apache 동작 확인
![]({{ site.baseurl }}/assets/posts/web/docker-apache-run.png)

* index.html 위치:/usr/local/apache2/htdocs 


### PHP 구버전 설치

```bash
apt-get install -y mysql-client
apt-get install -y libicu-dev
apt-get install -y libxml2-dev
wget http://uk.php.net/distributions/php-4.4.9.tar.gz
tar xzvf php-4.4.9.tar.gz
cd php-4.4.9
./configure --prefix=/usr/local/php4 --with-apxs2=/usr/local/apache2/bin/apxs --with-mysql
make
make install
```
* ./configure 할 때 apache2가 설치된 경로로 설정해야 함

### 설치 확인 및 php.ini 복사

apache2 설치 경로의 modules 폴더에 libphp4.so가 있어야한다.
 
`ls -alstr /usr/local/apache2/modules/`
![]({{ site.baseurl }}/assets/posts/web/libphp4-check.png)

php-4.4.9 폴더 안에 `php.ini-dist`파일과 `php.ini-recommended`파일이 있는데<br>
이 중 `php.ini-recommended`를 `/usr/local/apache2/conf/php.ini`로 복사해준다.

`cp php.ini-recommended /usr/local/apache2/conf/php.ini`

### Apache /usr/local/apache2/conf/httpd.conf 파일 확인 및 수정

1. ServerName 설정
`ServerName [localhost or IP or domain]`

2. LoadModule 확인
`LoadModule php4_module        modules/libphp4.so`

3. DirectoryIndex 수정

```bash
<IfModule dir_module>
    DirectoryIndex index.html index.php index.cgi index.htm
</IfModule>
```

4. AddType 추가

```bash
AddType application/x-compress .Z
AddType application/x-gzip .gz .tgz
AddType application/x-httpd-php .php .phtml .php3 .php4 .html .htm .inc
AddType application/x-httpd-source .phps
```

### PHP 컴파일 확인

![]({{ site.baseurl }}/assets/posts/web/phpinfo-check.png)


이 과정을 Dockerfile로 만들어 한 번에 빌드할 수 있다.
Dockerfile은 Github에 올려두었다.
[https://github.com/MitNy/Vulnerable-Web-Server](https://github.com/MitNy/Vulnerable-Web-Server)

### Dockerfile 빌드 및 실행

```
docker build -t [Image ID] .
docker run -it -d -p [port]:[port] --name [container name] [image name]
# EX) docker run -it -d -p 3333:80 -name web vulnerable-web
docker exec -it [Container ID] /bin/bash

```
