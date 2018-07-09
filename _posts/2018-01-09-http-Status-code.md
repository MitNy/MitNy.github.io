---
layout: post
title: ! "[WEB] HTTP Status code"
categories: [WEB]
excerpt: " "
comments: true
share: true
tags:
  - web
  - http
---

**1XX**

100 Continue
101 Switching Protocols

**2XX**

200 에러 없이 전송 성공
202 Accepted, 서버가 클라이언트의 명령을 받음
203 Non-authoritavive Information, 서버가 클라이언트 요구 중 일부만 전송
204 Non Content, 클라이언트 요구를 처리했으나 전송할 데이터가 없음
205 Reset Content
206 Partial Content


**3XX**

300 Multiple Choisces, 최근에 옮겨진 데이터 요청
301 Moved Permanently, 요구한 데이터를 변경된 임시 URL에서 찾았음
302 Moved Permanently, 요구한 데이터가 변경된 URL에 있음을 명시
303 See Other, 요구한 데이터를 변경하지 않았기 때문에 문제가 있음
304 Not modified
305 Use Proxy


**4XX**

400 Bad Request, 요청 실패
401.1 Unauthorized, 권한 없음(접속 실패)
401.2 Unauthorized, 권한 없음(서버 설정으로 인한 접속 실패)
402 Payment Required, 예약됨
403.1 Forbidden, 금지(수행 접근 금지)
403.2 Forbidden, 금지(읽기 접근 금지)
403.6 Forbidden, 금지(IP 주소 거부됨)
403.8 Forbidden, 금지(사이트 접근 거부됨)
403.9 Forbidden, 접근 금지(연결된 사용자 수 과다)
403.11 Forbidden, 접근 금지(패스워드 변경됨)
404 Not Found, 문서를 찾을 수 없음
405 Method not allowed, 메소드 허용 안 됨
406 Not Acceptable, 받아들일 수 없음
407 Proxy Authentication Required, proxy 인증이 필요함
408 Request timeout, 요청 시간이 지남
410 Gone, 영구적으로 사용할 수 없음


**5XX**

500 Internal Server Error, 서버 내부 에러
501 Not Implemented, 적용 안 됨
502 Bad gateway, 게이트웨이 상태 나쁨
503 Service Unavailable
504 Gateway timeout
505 HTTP Version Not Supported
