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

### 환경: Ubuntu 18.04 LTS / apache2 / php7.0

웹 서버 세팅을 위해 php모듈 포함 apm을 정상적으로 설치했는데,
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

1. /etc/apache2/apache2.conf 수정
![](/assets/posts/php/apache2conf_edit.png)

모든 유저에 대한 public_html 디렉토리 설정을 해준다.

```php
<Directory /home/*/public_html/>
        Options FollowSymLinks MultiViews
        AddType application/x-httpd-php .php .jsp
        AllowOverride FileInfo
        Require all granted
</Directory>
```

AddType 부분은 원하는대로 설정을 바꿔주면 된다.

2. /etc/apache/mods-enabled/php7.2.conf
* php는 버전에 따라 파일명 변경

```php
<IfModule mod_userdir.c>
    <Directory /home/*/public_html>
        php_admin_flag engine On
    </Directory>
</IfModule>
```

3. /etc/apache2/sites-enabled/000-default.conf 수정
VirtualHost 바깥에 추가

```php
Alias /public_html /home/*/public_html
<Directory /home/*/public_html>
    Options FollowSymLinks
    #DirectoryIndex index.php
    AllowOverride All
</Directory>
```

설정을 바꿔준 후에는 꼭 아파치를 재시작 해준다.
`service apache2 restart`

이렇게 설정해줬더니 php 파일이 다운로드 되는 것이 아닌 정상출력 되었다.
