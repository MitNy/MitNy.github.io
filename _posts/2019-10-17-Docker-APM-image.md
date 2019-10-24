---
layout: post
title: ! "[Ubuntu] Apache 2.4.7 + PHP 5.2.17 + MySQL 5.1 도커 이미지"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
published: false
tags:
  - Ubuntu
  - Docker
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/39_clear.png)

[Docker Hub](https://cloud.docker.com/repository/docker/mmjlee314/php-5.2-apache-mysql)

## 버전
- Ubuntu:trusty
- Apache 2.4.7
- PHP 5.2.17
- MySQL 5.1


## MySQL 데이터 폴더 생성 및 유저 생성
```
mkdir /var/lib/mysql
useradd [username]
chown -R [username]:[username] /var/lib/mysql
```

## /etc/mysql/my.cnf 수정
```
!includedir /etc/my.cnf.d
# add new line here
```

## DB 설치 
```
mysql_install_db --user=mysql
/usr/bin/mysqladmin -u root password [password]
```

## MySQL 실행
`mysqld_safe`
