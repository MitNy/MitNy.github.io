---
layout: post
title: ! "[Wargame.kr] web chatting"
categories: [Wargame.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - wargame.kr
  - write-up
---

Wargame.kr의 웹 문제 중 하나인 'web chatting'을 풀어보았다.
342 포인트를 얻을 수 있다.
<!--more-->

![]({{ site.baseurl }}/assets/posts/wargamekr/chat-main.png)
문제 페이지에 들어가면 로그인을 할 수 있고, 로그인한 아이디로 채팅을 할 수 있다.

![]({{ site.baseurl }}/assets/posts/wargamekr/chat.png)

![]({{ site.baseurl }}/assets/posts/wargamekr/chat-ni.png)

채팅을 하게 되면 개발자 도구의 Network 탭에서 데이터가 전송되는 모습을 볼 수 있다.

`chatlog.php?t=1`에는 ni 값이 있고, `chatview.php?t=1&ni=` 에는 채팅 데이터가 있다.
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-test.png)

왠지 ni 값을 조작하면 다른 사람이 채팅을 했던 기록도 볼 수 있을 것 같아서 바꿔봤더니
다음과 같이 정체불명의 채팅이 보였다.
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-who.png)

ni 값에 `or 1`을해줬더니 모든 채팅 기록이 떴다.
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-view.png)

* 페이지의 맨 밑에 결과가 나온다.
`union select 1,table_name,3,4,5 from information_schema.tables --`로 DB의 테이블 명을 알아내었다.
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-table.png)


`union select 1,column_name,3,4,5 from information_schema.columns --`로 테이블의 컬럼을 알아내었다.
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-column.png)

위에서 테이블을 알아냈을 때 있었던`chat_log_secret`이라는 수상한 테이블에서 readme 컬럼의 값들을 불러>올 것이다.
`union select 1,readme,3,4,5 from chat_log_secret --`
플래그!!
![]({{ site.baseurl }}/assets/posts/wargamekr/chat-flag.png)
데이터가 많아서 그런지 푸는 데 엄청난 렉이 걸려서 오래걸렸다..
