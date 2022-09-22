---
layout: post
title: ! "[Webhacking.kr] 4"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/4_main.png)

4번 문제를 보니 base64를 이용하는 것 같다.
`YzQwMzNiZmY5NGI1NjdhMTkwZTMzZmFhNTUxZjQxMWNhZWY0NDRmMg==`를 base64 디코딩 했더니
`c4033bff94b567a190e33faa551f411caef444f2` 가 나왔다. 40자리 해시값이다.

SHA-1으로 다시 디코딩 해보자.

![](/assets/posts/webhackingkr/4_sha1.png)
한번 했을 때 또 40자리 해시값이 나왔다.

한번 더 디코딩을 하면 아래와 같이 `test`가 나온다.
![](/assets/posts/webhackingkr/4_sha1_2.png)

test를 password 부분에 제출하면 문제가 풀린다.

