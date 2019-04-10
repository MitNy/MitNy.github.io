---
layout: post
title: ! "[WEB] HTTP Only flag와 Secure Cookie에 대하여"
categories: [WEB]
excerpt: " "
comments: true
share: true
tags:
  - web
  - HTTP
  - Cookie
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/39_clear.png)

* 부족한 부분 보완하기

### HTTP Only

[HttpOnly-OWASP](https://www.owasp.org/index.php/HttpOnly)
1. HTTP Only란?
- document.cookie와 같은 자바스크립트로 쿠키를 조회하는 것을 막는 옵션
- 브라우저에서 HTTP Only가 설정된 쿠키를 조회할 수 없다.
- 서버로 HTTP Request 요청을 보낼때만 쿠키를 전송한다.
- 이를 통해 XSS(Cross Site Scripting) 공격을 차단할 수 있다.

2. HTTP Only 설정 방법
- Tomcat 6 이상
* context.xml 에서 설정
```
<?xml version="1.0" encoding="UTF-8"?>
<Context path="/myWebApplicationPath" useHttpOnly="true">
```

- Java 6 이상, Servlet 3.0 지원되는 경우
* Java 코드 내에서
```
Cookie cookie = getMyCookie("myCookieName");
cookie.setHttpOnly(true);
```

* WEB-INF/web.xml 에서 설정
```
<session-config>
 <cookie-config>
  <http-only>true</http-only>
 </cookie-config>
</session-config>
```

- PHP 5.2.0 이상
```
session.cookie_httponly = True
```

### Secure Cookie
1. Secure Cookie란?
- 웹브라우저와 웹서버가 HTTPS로 통신하는 경우에만 웹브라우저가 쿠키를 서버로 전송하는 옵션

2. Secure 옵션 설정 방법
- Java 6 이상, Servlet 3.0 지원되는 경우
* WEB-INF/web.xml에서 설정
```
<session-config>
 <cookie-config>
  <secure>true</secure>
 </cookie-config>
</session-config>
```

- PHP
```
session.cookie_secure = True
```
