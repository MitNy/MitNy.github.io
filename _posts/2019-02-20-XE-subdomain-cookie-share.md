---
layout: post
title: ! "[PHP] XE와 서브도메인 페이지 간 쿠키 공유"
categories: [PHP]
excerpt: " "
comments: true
share: true
tags:
  - PHP
  - Cookie
---

동아리의 세미나 페이지에 동아리 회원만 접근할 수 있도록 해야 하는데, 어떻게 해야할 지 기술적으로 몰라서 안했었다.<br>
최근에 도메인과 서브 도메인간 쿠키 공유가 가능하다는 것을 알게 되어서 시작!<br>
XE로 만들어진 동아리 홈페이지에 로그인을 해야만 세미나 페이지에 접근할 수 있도록 하는 것이 목적이다.<br>
XE 홈페이지의 `xe_logged`,`PHPSESSID` 쿠키를 사용할 것이다.<br>

세미나 페이지는 아무런 쿠키도 설정되어 있지 않은 상태이다.
![]({{ site.baseurl }}/assets/posts/php/prev_cookie.png)

우선 세미나 페이지 서버의 php.ini 파일을 수정해준다.<br>
`/etc/php/7.0/apache2/php.ini`<br>
![]({{ site.baseurl }}/assets/posts/php/phpini.png)

처음에는 아무 것도 입력되지 않은 상태이고 이 곳에
`.domain`을 적어주면 된다.<br>
예를 들어 서브 도메인이`web.abc.com` 이라면 `.abc.com`이다.

수정 내용을 저장한 후, `service apache2 restart`로 아파치를 재시작 해준다.


PHPSESSID 쿠키의 도메인이 www.abc.com이 아닌 .abc.com 가 되도록 수정해야 한다.
`xe 설치 폴더/classes/context/Context.class.php` 에서 session_start() 전에 코드 한줄을 추가해준다.
`ini_set('session.cookie_domain', '.domain')`
![]({{ site.baseurl }}/assets/posts/php/phpsessid.png)

그럼 XE 홈페이지에서 PHPSESSID의 domain이 .abc.com으로 바뀐 것을 볼 수 있다.
![]({{ site.baseurl }}/assets/posts/php/home_cookie.png)

다른 쿠키들은 그대로 www.abc.com으로 설정되어 있다.

다음으로 로그인 상태를 알려주는 `xe_logged` 쿠키는 XE 모듈 코드를 직접 수정해주어야 한다.
xe_logged 쿠키가 생성되는 부분은 `xe 설치 폴더/modules/member/member.controller.php` 코드 내에 존재한다.
vi 편집 명령어 중 하나인 `/xe_logged`를 사용하면 쉽게 찾을 수 있다.

![]({{ site.baseurl }}/assets/posts/php/xe_logged.png)

처음에는 `setcookie('xe_logged', 'true', 0, '/')` 로 되어있으나, 서브 도메인에서도 사용할 수 있도록 cookie domain 을 추가할 것이다.

![]({{ site.baseurl }}/assets/posts/php/xe_logged_domain2.png)

`setcookie('xe_logged', 'true', 0, '/','.abc.com')` 이렇게 설정을 해주면

![]({{ site.baseurl }}/assets/posts/php/next_cookie.png)

서브 도메인에서도 XE 홈페이지에서 생성된 쿠키를 확인할 수 있다.

#### 쿠키 설정
setcookie(cookie name, cookie value, cookie lifetime, cookie path, domain, connection type, http access);

- cookie name : 쿠키 이름
- cookie value : 쿠키 값
- cookie lifetime : 쿠키 만료 시간
- cookie path : 웹 사이트의 특정 디렉토리 내에서만 유효하도록 설정, '/' 일 경우 웹 사이트 전체에서 접>근 가능
- cookie domain : 특정 서브도메인 또는 도메인 전체를 유효범위로 지정
- connection type : true/false, true일 경우 https만 접근 가능
- http access : true/false, true일 경우 http만 접근 가능

[참고](http://jinolog.com/programming/etc/2011/11/13/sharing-cookies-across-multiple-domains.html)


다음 할 일은 이 쿠키들을 이용해 홈페이지에 로그인 한 사람만 접근할 수 있도록
기존 코드를 수정하는 것이다 :)
