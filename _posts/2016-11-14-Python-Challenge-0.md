---
layout: post
title: ! "[Python] Python Challenge 0"
categories: [Python]
excerpt: " "
comments: true
share: true
tags:
  - python
  - challenge
  - write-up
---

![]({{ site.baseurl }}/assets/posts/python/challenge0.png)

`Hint: try to change the URL address. http://www.pythonchallenge.com/pc/def/0.html`

처음 파이썬 챌린지 페이지에 들어가면 URL주소와 URL 주소를 변경해보라는 힌트를 볼 수 있다.
이미지 파일의 주소는 http://www.pythonchallenge.com/pc/def/calc.jpg

`http://www.pythonchallenge.com/pc/def/1.html` 로 URL을 변경해 보았더니
`2**38 is much much larger.` 라는 메시지가 뜬다.

`http://www.pythonchallenge.com/pc/def/2**38.html` 로 URL을 변경하면
`give the answer, not the question.` 라는 메시지가 뜬다.

파이썬 idle에 `2**38` 을 입력해 계산해봤다.
```py
>>> 2**38
274877906944
```

이 때, 274877906944 이 값을 URL 주소에 넣어주면 1번 문제 페이지로 넘어가게 된다.
