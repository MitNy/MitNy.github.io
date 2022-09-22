---
layout: post
title: ! "[Webhacking.kr] 23"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/23_main.png)

23번 문제로 들어가면 `Your mission is to inject <script>alert(1);</script> ` 라고 친절하게 어떻게 해야될지 알려준다.

![](/assets/posts/webhackingkr/23_nohack.png)

그대로 `<script>alert(1);</script>` 를 ?code= 부분에 넣어주면 no hack! 이 뜬다.

null byte를 이용한 XSS 필터 우회 문제인 것 같고 alert(1);이 뜬다고 문제가 풀리는게 아니라 `<script>alert(1);</script>` 전체가 떠야 되는 것 같다.

이것저것 해보다가 `<script>` 태그에 null byte를 넣어주면 된다는 것을 깨달았다.
`<%00script>alert(1);%00</script>`

![](/assets/posts/webhackingkr/23_main.png)

이미 풀려있어서 저렇게 뜨는거지만 정상적으로 풀리면 Congratulation! 팝업창이 뜬다.

