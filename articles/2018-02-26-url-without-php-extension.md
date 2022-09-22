---
layout: post
title: ! "[PHP] .php 확장자 없이 URL 접속하기"
categories: [PHP]
excerpt: " "
comments: true
share: true
tags:
  - url
  - extension
  - php
---


## Accessing url without .php extension
### 환경: Ubuntu 16.04 LTS

php나 다른 언어로 페이지를 만들었을 때, 주소창에 abcd.com/index.php 보단 abcd.com/index 로 접속하는게 더 깔끔하고 보안상 더 좋다.
설정만 바꿔주면 간단히 URL상에서 확장자 없이 접속 가능하다.
다른 분들은 httpd.conf 를 수정하라고 하셨으나 httpd.conf 가 없어서 몇시간 헤매다가 apache2.conf를 수정하면 된다는 것을 깨달았다.

```
$ cd /etc/apache2
$ vi apache2.conf
```

![](/assets/posts/php/apache2_setting.png)

```
<Directory /var/www/>
        Options FollowSymLinks MultiViews
        AddType application/x-httpd-php .php .jsp
        Require all granted
        AllowOverride FileInfo
</Directory>
```

이렇게 설정을 바꿔준 후엔 재시작을 해줘야 적용된다.

```
$ /etc/init.d/apache2 restart
```
**이 글과는 상관없지만 Options에서 Indexs 는 절대 넣지 않기를 추천합니다.**

