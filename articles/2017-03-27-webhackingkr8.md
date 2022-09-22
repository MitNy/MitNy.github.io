---
layout: post
title: ! "[Webhacking.kr] 8"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/8_main.png)

8번 문제는 새로고침을 누르면 done! (0/70) 의 카운트가 올라가는데
문제 푸는데는 별 상관이 없는거 같다..
이 첫 페이지 소스를 보면 index.phps가 주석 처리 되어있고 index.phps는 다음과 같다.

```php
<?

$agent=getenv("HTTP_USER_AGENT");
$ip=$_SERVER[REMOTE_ADDR];

$agent=trim($agent);

$agent=str_replace(".","_",$agent);
$agent=str_replace("/","_",$agent);

$pat="/\/|\*|union|char|ascii|select|out|infor|schema|columns|sub|-|\+|\||!|update|del|drop|from|where|order|by|asc|desc|lv|board|\([0-9]|sys|pass|\.|like|and|\'\'|sub/";

$agent=strtolower($agent);

if(preg_match($pat,$agent)) exit("Access Denied!");

$_SERVER[HTTP_USER_AGENT]=str_replace("'","",$_SERVER[HTTP_USER_AGENT]);
$_SERVER[HTTP_USER_AGENT]=str_replace("\"","",$_SERVER[HTTP_USER_AGENT]);

$count_ck=@mysql_fetch_array(mysql_query("select count(id) from lv0"));
if($count_ck[0]>=70) { @mysql_query("delete from lv0"); }


$q=@mysql_query("select id from lv0 where agent='$_SERVER[HTTP_USER_AGENT]'");

$ck=@mysql_fetch_array($q);

if($ck)
{ 
echo("hi <b>$ck[0]</b><p>");
if($ck[0]=="admin")

{
@solve();
@mysql_query("delete from lv0");
}


}

if(!$ck)
{
$q=@mysql_query("insert into lv0(agent,ip,id) values('$agent','$ip','guest')") or die("query error");
echo("<br><br>done!  ($count_ck[0]/70)");
}


?>
```

$agent 변수에 USER-AGENT 값을 넣고 필터링 검사를 하는데, id가 admin일 때 문제가 풀린다. 
$agent,$ip,id를 insert 쿼리로 데이터베이스에 넣어주는데 quest로 되어있어서 admin으로 어떻게 만들까 고민을 했는데
insert 쿼리는 values에 콤마를 사용해 여러개의 데이터를 집어넣을 수 있다.

`insert into lv0('(아무값)','127.0.0.1','admin') values('(아무값','$ip','guest')`

![](/assets/posts/webhackingkr/8_burf1.png)

agent에 인젝션을 해야 하므로 Burp Suite를 이용해 User-Agent에 `(아무값)','127.0.0.1','admin'),('아무값` 을 넣어 Forward 해준다.
그러면 데이터베이스에 (아무값) 127.0.0.1 admin , (아무값) 127.0.0.1 guest 2개가 동시에 생성되었을 것이다.

![](/assets/posts/webhackingkr/8_burf2.png)

다시 User-Agent에 방금 데이터베이스에 생성한 admin값을 가지는 아무값을 넣어 Forward 해주면 문제가 풀린다.

![](/assets/posts/webhackingkr/8_clear.png)
