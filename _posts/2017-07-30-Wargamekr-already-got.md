---
layout: post
title: ! "[Wargame.kr] already got"
categories: [Wargame.kr]
excerpt: " "
comments: true
share: true
tags:
  - Wargame.kr
  - Web-hacking
  - already got
  - write-up
---
![]({{ site.baseurl }}/assets/posts/wargamekr/wargamekr.png)

![]({{ site.baseurl }}/assets/posts/wargamekr/already-got.png)

첫번째 문제인 already got 문제는
`can you see HTTP Response header?`

이 문장을 보니 HTTP Response header를 봐야할 것 같다.
그래서 Burp Suite 프로그램을 사용했다.
첫 페이지 url http://wargame.kr:8080/already_got/ 일 때 돌려보니 쿠키값만 나와서
http://wargame.kr:8080/already_got/index.php로 바꿔서 돌려보니 이렇게FLAG 값이 떴다.

![]({{ site.baseurl }}/assets/posts/wargamekr/already-flag.png)
![]({{ site.baseurl }}/assets/posts/wargamekr/already-clear.png)

Wargame.kr 1번 클리어!
