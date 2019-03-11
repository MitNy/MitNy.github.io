---
layout: post
title: ! "[Webhacking.kr] 25"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/25_main.png)

25번은 hello.txt 파일이 떠있고 password.php에 패스워드가 있을 것 같다.
Local file inclusion (LFI) 와 관련된 문제인 것 같고
`file=password.php%00(null byte)`를 해주니 문제가 풀렸다.
null byte의 url디코딩 값을 못찾아내서 헤맸었다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/25_clear.png)
