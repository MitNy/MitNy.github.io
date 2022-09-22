---
layout: post
title: ! "[Webhacking.kr] 18"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/18_main.png)

18번은 SQL INJECTION 관련 문제인 것같다.
문제 페이지엔 index.phps 페이지로 들어갈 수 있게 해놨는데 들어가보면

```php
<? 
if($_GET[no]) 
{ 

if(eregi(" |/|\(|\)|\t|\||&|union|select|from|0x",$_GET[no])) exit("no hack"); 

$q=@mysql_fetch_array(mysql_query("select id from challenge18_table where id='guest' and no=$_GET[no]")); 

if($q[0]=="guest") echo ("hi guest"); 
if($q[0]=="admin") 
{ 
@solve(); 
echo ("hi admin!"); 
} 

} 

?> 
```

no를 get으로 입력받아야 소스가 실행되고, eregi를 이용해 no를 입력 받았을 때,  `공백,|/|\(|\)|\t|\||&|union|select|from|0x` 이런 값들이 있으면 exit에 의해 no hack이 뜨며 함수가 실행되지 않고 종료된다.
그 다음 mysql 함수로 id = guest이고 입력받은 no값과 일치하는 id를 검색하여 q라는 변수에 저장한다.

아무거나 넣어보다가 1을 넣어봤는데

![](/assets/posts/webhackingkr/18_1.png)

url에 no=1이 뜨고 hi guest가 뜨는걸 보아 no=1의 id는 guest이다.
mysql table에 admin과 guest밖에 없다면 no=2는 admin이 아닐까 추측해본다.

`$q=@mysql_fetch_array(mysql_query("select id from challenge18_table where id='guest' and no=$_GET[no]"));` 에서
조건이 id가 guest이므로 admin을 뽑아내려면 저 조건을 무효화 시켜야한다.
`$q=@mysql_fetch_array(mysql_query("select id from challenge18_table where id='guest' and no=0 or no=2"));` 으로 바꿔주면
id가 guest이고 no값이 0인 id를 찾거나, no=2인 id를 찾아야 한다는 뜻이다.
sql 연산 순서는 and > no 이기 때문에 (id='guest' and no=0) or no =2

공백이 들어가면 함수가 종료되기 때문에 공백을 우회해야 하는데
\는 eregi에 의해 막히기 때문에 \n를 같이 인코딩한 값인 %0a를 써야한다.
주소창에 no=2 or no=2 인 `no=2%0aor%0ano=2` 를 넣어보면

![](/assets/posts/webhackingkr/18_clear.png)

hi admin! 이 뜨며 문제가 풀린다.
