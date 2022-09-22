---
layout: post
title: ! "[Webhacking.kr] 39"
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
<html>
<head>
<title>Chellenge 39</title>
</head>
<body>

<?

$pw="????";

if($_POST[id])
{
$_POST[id]=str_replace("\\","",$_POST[id]);
$_POST[id]=str_replace("'","''",$_POST[id]);
$_POST[id]=substr($_POST[id],0,15);
$q=mysql_fetch_array(mysql_query("select 'good' from zmail_member where id='$_POST[id]"));

if($q[0]=="good") @solve();

}

?>

<form method=post action=index.php>
<input type=text name=id maxlength=15 size=30>
<input type=submit>
</form>
</body>
</html>
```
여기서 쓰인 str_replace 함수의 사용법은
$_POST[id] = str_replace("-","",$_POST[id]);
$_POST[id] = str_replace("찾을문자열","치환할문자열","대상문자열");

substr은 php에서 문자열에서 일부를 잘라내어 쓰고자 할 때 사용된다.
**string substr ( string $string , int $start [, int $length ] )**
$string에 담고 있는 문자열의 $start부터 길이$length만큼을 잘라내어 반환합니다.
즉, $_POST[id] 문자열에서 \ -> (공백) , ' -> '' 이렇게 치환되고
$_POST[id] 문자열에서 0부터 15까지의 구간을 반환한다는 것.

![](/assets/posts/webhackingkr/39_warning.png)

아무거나 입력 했을 땐 이렇게 뜨는데
index.php 페이지의 17번째 라인을 보자.
`select 'good' from zmail_member where id='$_POST[id]`
자세히 보니 id 부분의 싱글쿼터(')가 닫히지 않았다.
그럼 싱글쿼터를 닫아주는 형식으로 입력해주면 될 것 같다.
15개의 글자를 입력해 주고 마지막은 싱글쿼터로 닫아 주어야 하는데 '가 ''으로 치환되므로
admin         ' 이런식으로 입력 해주면 16글자가 된다.
 ' 하나가 잘려나가면 15자리 숫자가 되고 싱글쿼터로 닫히므로 문제를 풀 수 있다.

![](/assets/posts/webhackingkr/39_clear.png)

