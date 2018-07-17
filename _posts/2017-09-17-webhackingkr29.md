---
layout: post
title: ! "[Webhacking.kr] 29"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/29_main.png)

29번은 파일 업로드 문제이다.
문서파일에 있던 빈 파일 wrong.txt 를 제출했을 때의 상태이다.
filename="wrong.txt" 이렇게 제출한 파일명과 확장자가 들어간다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/29_wrong.png)

이 filename 부분을 이용해 sql injection을 하는 것 같은데
select password from c29_tb 가 힌트에 있는 것을 보니
파일명에 저 c29_tb 테이블에서 password를 찾는 쿼리문을 넣으면 될 것 같다.
파일명 부분엔 아무거나 넣고 select password from c29_tb 와 자신의 ip를 ascii 값으로 변환하여 filename부분에 입력해주면 된다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/29_query.png)

`"aaa', (select password from c29_tb), char(~~~~~~~~~~~~~~~~~~));#"`

![]({{ site.baseurl }}/assets/posts/webhackingkr/29_done.png)

filename을 바꿔준 후 반응을 보면 지금까지 제출했던 파일들의 테이블과 password가 출력된다.
알아낸 password는 Auth에 제출하면 된다.


