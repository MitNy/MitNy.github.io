---
layout: post
title: ! "[LOS] zombie_assassin"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - LOS
---

![]({{ site.baseurl }}/assets/posts/los/zombie_assassin.png)

직전 문제가 assassin이었는데 zombile_assassin 문제가 나왔다!
id와 pw를 파라미터로 받고, 싱글 쿼터(')가 필터링 되어 있다.
그런데 필터링을 할때 preg_match()가 아닌 ereg()를 사용한다. 
ereg() 함수는 대소문자 구분이 없고 NULL문자를 만나면 이후로 문자열 검사를 하지 않기 때문에
`%00`를 앞에 넣어 ' 필터링을 우회할 수 있다.

`https://los.eagle-jump.org/zombie_assassin.php?id=1&pw=%001' or id='admin`

![]({{ site.baseurl }}/assets/posts/los/zombie_assassin_clear.png)
클리어!!

