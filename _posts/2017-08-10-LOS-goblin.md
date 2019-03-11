---
layout: post
title: ! "[LOS] goblin"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - goblin
  - write-up
---
![]({{ site.baseurl }}/assets/posts/los/goblin.png)

cobolt 를 풀고 goblin으로 넘어오면 id 값은 guest로 고정이고 no 값만 입력받는 쿼리문이 있다.

`query: select id from prob_goblin where id='guest' and no=`

```php
<?php 

  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[no])) exit("No Hack ~_~"); 
  if(preg_match('/\'|\"|\`/i', $_GET[no])) exit("No Quotes ~_~"); 
  $query = "select id from prob_goblin where id='guest' and no={$_GET[no]}"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id']) echo "<h2>Hello {$result[id]}</h2>"; 
  if($result['id'] == 'admin') solve("goblin");
  highlight_file(__FILE__); 
?>
```
' , " 등이 필터링 대상이기 때문에 쓸 수 없다.

![]({{ site.baseurl }}/assets/posts/los/goblin_guest.png)

no 값이 1일때, Hello guest 가 뜬다.
예상되는 구조는 다음과 같다.

| no=1 | guest |
|------|-------|
| no=2 | admin |

id가 guest로 고정이기 때문에 no=2 를 넘겨도 id는 admin이 되지 않는다.
그렇다면 no값도 주고 id값도 admin으로 줄 수 있도록 하면 되지 않을까

`?no=0%20or%20id=char(97,100,109,105,110)`

이런식으로 직접적으로 admin을 넣어주지 않고 char 를 써주면 97 100 109 105 110이 admin이 된다.
그리고 no에는 guest의 no 값인 1을 넣어주면 풀리지 않는다.

![]({{ site.baseurl }}/assets/posts/los/goblin_clear.png)

고블린 클리어!


