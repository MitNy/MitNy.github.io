---
layout: post
title: ! "[FreeACS] FreeACS MySQL schema 생성하기"
categories: [FreeACS]
excerpt: " "
comments: true
share: true
tags:
  - FreeACS
  - Ubuntu
  - MySQL
  - schema
---

freeacs를 설치하고 처음 mysql에 접속하면 acs를 제외한 다른 database들이 존재한다.
acs 라는 이름을 가진 database를 생성하고, 그 곳에 freeacs의 mysql schema를 넣을 것이다.

![]({{ site.baseurl }}/assets/posts/freeacs/mysql_database.png)

이전 포스팅에서 freeacs를 설치하는 installation/ubuntu 디렉토리에 들어가서
`mysql -uroot -pqwer acs < install.sql` 를 해준다.
그럼 아래와 같이 table들이 생성된 것을 볼 수 있다.

![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_schema.png)
