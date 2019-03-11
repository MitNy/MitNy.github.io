---
layout: post
title: ! "[Webhacking.kr] 32"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

32번 문제는 투표 페이지 브루트포스 문제인데 들어가면 유저들의 목록이 뜨고 x/100 이렇게 투표가 되는걸 볼 수 가 있다.
![]({{ site.baseurl }}/assets/posts/webhackingkr/32_join.png)
맨 아래로 내려가면 Join이 있고, 이걸 눌러야 투표에 나를 추가할 수 있다.
투표 목록에 있는 이름이나 숫자를 클릭하면 no!가 뜨고 vote_check=ok; 라는 쿠키가 생성된다.
그런데 아무리 눌러도 숫자가 증가하지 않는걸 보니 vote_check=ok; 라는 쿠키가 문제인 것 같다.
쿠키를 삭제해가며 클릭해도 되지만 Burp Suite를 이용해 풀어볼 것이다.

새로 알게 된 기능인데 Proxy 탭에서 Send to Repeater를 하면 반복작업을 할 수 있다.
그래서 쿠키를 vote_check=; 로 ok 부분을 삭제하고 Go를 누르면 숫자가 증가한다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/32_burf.png)

![]({{ site.baseurl }}/assets/posts/webhackingkr/32_ranking.png)
Go를 99번 눌러서 99/100이 되었고

![]({{ site.baseurl }}/assets/posts/webhackingkr/32_clear.png)

100을 채우면 문제가 풀린다

