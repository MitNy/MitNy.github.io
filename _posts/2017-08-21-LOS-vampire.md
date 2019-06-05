---
layout: post
title: ! "[LOS] vampire"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - vampire
  - write-up
---

### https://los.eagle-jump.org/ 버전
![]({{ site.baseurl }}/assets/posts/los/vampire.png)

`query : select id from prob_vampire where id=''`
```php
<?php 
  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/\'/i', $_GET[id])) exit("No Hack ~_~"); 
  $_GET[id] = str_replace("admin","",$_GET[id]); 
  $query = "select id from prob_vampire where id='{$_GET[id]}'"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id'] == 'admin') solve("vampire"); 
  highlight_file(__FILE__); 
?>
```
vampire 문제는 id에 admin이 들어오면 공백으로 바꿔버린다. 아래 str_replace 때문이다.
`$_GET[id] = str_replace("admin","",$_GET[id]);`

![]({{ site.baseurl }}/assets/posts/los/vampire_admin.png)

이렇게 ?id=admin 을 해버리면 쿼리문 안의 id에는 아무 것도 들어있지 않게 된다.
이 문제도 대소문자로 우회해 풀 수 있다.

Admin,ADMIN,aDmin 등등.. 한 글자 또는 전체를 대문자로 바꿔버리면 된다.

![]({{ site.baseurl }}/assets/posts/los/vampire_clear.png)


### https://los.rubiya.kr 버전
비슷한 문제이지만 위와 같이 단순히 대소문자 만으로는 풀리지 않는다.
str_replace() 취약점 중 하나를 이용해서
`?id=adadminmin`를 입력하면 ad'admin'min 에서 admin이 제거되어 `?id=admin`이 필터링 되지 않는다.
![]({{ site.baseurl }}/assets/posts/los/vampire_2_clear.png)

