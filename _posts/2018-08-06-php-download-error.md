---
layout: post
title: ! "[PHP] php 파일 접근시 다운로드 에러"
categories: [PHP]
excerpt: " "
comments: true
share: true
tags:
  - php
  - Ubuntu
  - download
---

### 환경: Ubuntu 16.04 LTS / apache2 / php7.0

웹 서버 세팅을 위해 apm을 정상적으로 설치했는데,
처음엔 아래 명령어를 입력하지 않아서 user 접속시 404 not found만 떴었다.
그 에러는 아래 명령어로 해결
```
sudo a2enmod userdir
sudo service apache2 restart
```
404 not found는 해결했으나
`ip/~user/test.php` 등으로 php 파일에 접근하면 파일 내용이 보이는 것이 아니라 다운로드 되는 현상이 지속되었다.
이 에러 해결을 위해 아예 서버를 갈아엎고 온갖 삽질을 다 했는데 해결이 안됐었다.
해결 방법을 찾아봐도 php.ini 에서 `short_open_tag = On` 로 default값인 Off를 On으로 바꾸라는 것이 제일 많았다.
하지만 php를 항상 `<?php ?>`로 사용해왔기 때문에 효과적인 해결 방법은 아니었다.

apache2.conf도 고쳐보고 php.ini도 고쳐보고 하다가 진짜 해결 방법을 찾았다.

`/etc/apache2/mods-enabled/php7.0.conf` 파일에서 `php_admin_flag engine` 설정을 주석처리 하는 것이다.

![]({{ site.baseurl }}/assets/posts/ubuntu/php7conf.png)


