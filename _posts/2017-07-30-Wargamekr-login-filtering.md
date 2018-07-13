---
layout: post
title: ! "[Wargame.kr] login filtering"
categories: [Wargame.kr]
excerpt: " "
comments: true
share: true
tags:
  - Wargame.kr
  - Web-hacking
  - login filtering
  - write-up
---
![]({{ site.baseurl }}/assets/posts/wargamekr/wargamekr.png)

![]({{ site.baseurl }}/assets/posts/wargamekr/login-filtering-main.png)

로그인 필터링 문제의 소스를 보면
```php
<?php


if (isset($_GET['view-source'])) {
    show_source(__FILE__);
    exit();
}

/*
create table user(
 idx int auto_increment primary key,
 id char(32),
 ps char(32)
);
*/

 if(isset($_POST['id']) && isset($_POST['ps'])){
  include("../lib.php"); # include for auth_code function.

  mysql_connect("localhost","login_filtering","login_filtering_pz");
  mysql_select_db ("login_filtering");
  mysql_query("set names utf8");

  $key = auth_code("login filtering");

  $id = mysql_real_escape_string(trim($_POST['id']));
  $ps = mysql_real_escape_string(trim($_POST['ps']));

  $row=mysql_fetch_array(mysql_query("select * from user where id='$id' and ps=md5('$ps')"));

  if(isset($row['id'])){
   if($id=='guest' || $id=='blueh4g'){
    echo "your account is blocked";
   }else{
    echo "login ok"."<br />";
    echo "Password : ".$key;
   }
  }else{
   echo "wrong..";
  }
 }
?>
```
코드를 볼 때 php 코드만 자세히 보고 맨 밑 코드를 못봤었다.

```php
<!--

you have blocked accounts.

guest / guest
blueh4g / blueh4g1234ps

-->
```

이렇게 주석처리 된 부분에 로그인 id와 password를 적어놓았다.
일단 입력받은 id가 guest 이거나 blueh4g 이면 `your account is blocked`
쿼리상에선 알파벳의 대소문자 구분이 없고, php상에선 그대로 인식하므로 Guest 같이 대소문자를 섞어서 id를 입력하면 된다.
Guest 뿐만 아니라 Blueh4g도 가능. 패스워드는 그대로 입력해준다.
로그인에 성공하면 Password가 뜨고, 인증하면 된다.

![]({{ site.baseurl }}/assets/posts/wargamekr/login-filtering-clear.png)
