---
layout: post
title: ! "[Apache Thrift] Ubuntu에 Apache Thrift 설치하기"
categories: [Apache Thrift]
excerpt: " "
comments: true
share: true
tags:
  - Apache Thrift
  - Ubuntu
  - install
---

## How to install Apache Thrift on Ubuntu 16.04
### 환경 : Ubuntu 16.04 LTS
### Apache thrift version : 0.11.0

```
$ sudo apt-get install wget
$ sudo apt-get install ant

$ sudo apt-get install libboost-dev libboost-test-dev libboost-program-options-dev libboost-filesystem-dev libboost-thread-dev libevent-dev automake libtool flex bison pkg-config g++ libssl-dev
```

필요한 라이브러리들을 설치해준다.

`http://apache.mirror.cdnetworks.com/thrift/0.11.0/thrift-0.11.0.tar.gz`

위 링크를 wget 하여 apache thrift 설치 파일을 받아온다.

![](/assets/posts/apache-thrift/apache_thrift.png)

다 받아지면

```
$ tar -xvf thrift-0.11.0.tar.gz
cd thrift-0.11.0
$ ./bootstrap.sh
$ ./configure
$ sudo make
$ sudo make install
```

`thrift 버전 체크 : thrift -version`

