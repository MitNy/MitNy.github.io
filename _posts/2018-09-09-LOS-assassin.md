---
layout: post
title: ! "[LOS] assassin"
categories: [LOS]
excerpt: " "
comments: true
share: true
tags:
  - LOS
  - Web-hacking
  - assassin
  - write-up
---


### https://los.eagle-jump.org/ 버전
![]({{ site.baseurl }}/assets/posts/los/assassin.png)

`query : select id from prob_assassin where pw like ''`

assassin 문제는 like를 이용한 문제이다. mysql를 활용해서 코딩을 하다보면 가끔씩 like를 쓸 때가 있었다.
특히 검색을 할 때 like를 사용해 입력된 문자열과 일치하는 모든 데이터를 뽑아올 때 사용했다.
이번 문제를 풀 때 도움이 많이 됐다.

정리 해보면

1. like '%1%' -> 전체 문자열에 1이 들어감
2. like '1%' -> 문자열이 1로 시작됨
3. like '%1' -> 문자열이 1로 끝남

![]({{ site.baseurl }}/assets/posts/los/assassin_guest_1.png)

`?pw=( )%` 로 원래는 코드를 짜서 풀려고 했는데 조건을 주기가 애매해서 그냥 한글자씩 직접 넣어봤다.
어떤 문자를 넣어봐도 Hello guest만 떴기 때문에 좀 더 정확한 문자열이 필요했다.

![]({{ site.baseurl }}/assets/posts/los/assassin_8.png)
![]({{ site.baseurl }}/assets/posts/los/assassin_83.png)
8% 로 guest의 password가 8로 시작한다는 것을 알아냈고,
8 뒤에 숫자를 덧붙여 83~~~ 으로 시작된다는 것도 알아냈다.
더 길거라고 예상을 했지만 832% 에서 Hello Admin이 나왔다.

![]({{ site.baseurl }}/assets/posts/los/assassin_clear.png)


### https://los.rubiya.kr 버전
![]({{ site.baseurl }}/assets/posts/los/assassin_2_clear.png)
