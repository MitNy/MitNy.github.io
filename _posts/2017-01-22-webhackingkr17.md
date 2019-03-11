---
layout: post
title: ! "[Webhacking.kr] 17"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/17_main.png)

17번은 입력창과 체크버튼이 있다.

개발자 도구를 통해 코드를 보면 

![]({{ site.baseurl }}/assets/posts/webhackingkr/17_f12.png)

unlock이라는 변수와 사칙연산되는 값들이 있다.

이 값들을 크롬 개발자도구 콘솔을 사용해 계산해줄 수 있다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/17_console.png)

계산값은 9997809307
이 값을 메인 페이지에 있던 입력창에 넣고 check를 누르면 `Password is 999780930.7` 라는 창이 뜬다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/17_password.png)

Auth에 저 숫자를 입력하면 문제가 풀린다.

