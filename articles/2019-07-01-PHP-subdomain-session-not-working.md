---
layout: post
title: ! "[PHP] 서브도메인 세션 동작안하는 문제 해결"
categories: [PHP]
excerpt: " "
comments: true
share: true
tags:
  - PHP
  - subdomain
  - session
---

갑자기 서버 접속 인원이 늘어나면서 잘 동작하던 로그인 기능이 먹통이 됐다<br>
접속 인원 급증과 session_start()가 작동 안하는 문제의 연관성은 아직 잘 모르겠다..<br>
며칠동안 해결을 못하다가 문득 [XE와 서브도메인 페이지 간 쿠키 공유](https://mitny.github.io/articles/2019-02/XE-subdomain-cookie-share) 이 때 건드린 설정 문제인가 생각이 들었다.<br>

글을 다시 보고 `ini_set('session_cookie_domain','.domain')`을 session_start() 전에 넣어줬는데 500에러가 떴다.<br>
그래서 다시 `session_cookie_domain not working`으로 검색!<br>

`session_set_cookie_params( 0, "/", ".domain", false, false);`
이 한줄을 session_start() 전에 넣어주면 세션이 정상적으로 동작한다.

