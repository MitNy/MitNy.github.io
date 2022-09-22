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

### HTTP Only

[HttpOnly-OWASP](https://www.owasp.org/index.php/HttpOnly)

1. HTTP Only란?

- document.cookie와 같은 자바스크립트로 쿠키를 조회하는 것을 막는 옵션
- 브라우저에서 HTTP Only가 설정된 쿠키를 조회할 수 없다.
- 서버로 HTTP Request 요청을 보낼때만 쿠키를 전송한다.
- 이를 통해 XSS(Cross Site Scripting) 공격을 차단할 수 있다.

1. HTTP Only 설정 방법

- Tomcat 6 이상
- context.xml 에서 설정

```xml
<?xml version="1.0" encoding="UTF-8">
<Context path="/myWebApplicationPath" useHttpOnly="true">
```

- Java 6 이상, Servlet 3.0 지원되는 경우
- Java 코드 내에서
```java
Cookie cookie = getMyCookie("myCookieName");
cookie.setHttpOnly(true);
```

- WEB-INF/web.xml 에서 설정

```xml
<session-config>
	<cookie-config>
		<http-only>true</http-only>
	</cookie-config>
</session-config>
```

- PHP 5.2.0 이상
```php
session.cookie_httponly = True
```

### Secure Cookie

1. Secure Cookie란?
- 웹브라우저와 웹서버가 HTTPS로 통신하는 경우에만 웹브라우저가 쿠키를 서버로 전송하는 옵션

2. Secure 옵션 설정 방법
- Java 6 이상, Servlet 3.0 지원되는 경우
- WEB-INF/web.xml에서 설정

```xml
<session-config>
	<cookie-config>
		<secure>true</secure>
	</cookie-config>
</session-config>
```

- PHP
```php
session.cookie_secure = True
```

### 직접 해보기

PHP에서 설정하는 방법으로 위의 옵션들을 직접 적용해 볼 것이다.

![](/assets/posts/web/secure_cookie_comment.png)
기본 옵션에서는 secure 옵션이 주석 처리 되어있다.
![](/assets/posts/web/httponly_cookie.png)

위와 같이 `session.cookie_secure = True`,`session.cookie_httponly = True`로 설정해준 후
apache 서버를 재시작해준다.

그 후에 쿠키를 확인해보면 Secure, HTTP 전용 옵션이 체크되어있는 것을 확인할 수 있다.
![](/assets/posts/web/secure_only_session.png)

설정되어 있지 않은 쿠키와 비교해보자
![](/assets/posts/web/none_cookie.png)

첫번째로 확인해볼 것은 콘솔창에서 `document.cookie;` 를 쳤을 경우 쿠키가 출력되는가이다.

![](/assets/posts/web/document_cookie.png)
예상대로 HTTP 전용 옵션이 꺼져있는 쿠키만 출력된다. 쿠키 에디터로 옵션을 꺼도 출력된다.

두번째로 확인해볼 것은 http 통신에서 쿠키가 전송되는가이다.
![](/assets/posts/web/secure_5.png)
https 통신으로 페이지에 접속했을 때는 secure 옵션이 적용된 쿠키 2개, 적용되지 않은 3개 총 5개의 쿠키가 있었다.

하지만 https 통신으로 페이지에 접속했을 때 secure 옵션이 적용되지 않은 3개의 쿠키만 있었다.
![](/assets/posts/web/secure_3.png)

옵션들이 잘 적용되는 것을 확인해보았다.
보안 옵션을 적용해 안전한 페이지를 만들어요!! :)
