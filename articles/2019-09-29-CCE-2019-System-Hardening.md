---
layout: post
title: ! "[CTF] 2019 사이버공격방어대회 예선 System Hardening"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - CTF
  - write-up
---

2019 사이버공격방어대회 예선에서 시스템 하드닝이라는 분야를 처음 접했다.<br>
서로 다른 환경의 설정 파일을 조건에 맞게 수정하여 업로드하면 플래그를 준다.<br>
총 3개의 문제가 나왔고 web.xml, elasticsearch.yml, django 설정을 바꾸는 것이었다.<br>

### web.xml

![](/assets/posts/ctf/CCE2019/sh_1.png)

- web.xml 설정을 수정해서 PUT, DELETE 메소드를 차단하세요.

ATTACHMENT를 클릭하면 설정 파일이 다운로드 되고, 그 파일을 수정하면 된다.

![](/assets/posts/ctf/CCE2019/sh_1_conf.png)

업로드 해야 할 파일과 테스트 스크립트도 알려준다.

PUT,DELETE 메소드를 차단하려면 `<security-constraint>` 옵션을 추가해주면 된다.
모든 요청에 대해 PUT, DELETE 메소드를 차단하는 설정은 다음과 같다.

```
<security-constraint>
	<web-resource-collection>
		<web-resource-name>Restricted methods</web-resource-name>
			<url-pattern>/*</url-pattern>
			<http-method>PUT</http-method>
			<http-method>DELETE</http-method>
			<http-method>OPTIONS</http-method>
			<http-method>TRACE</http-method>
		</web-resource-collection>
		<auth-constraint />
</security-constraint>
```

![](/assets/posts/ctf/CCE2019/sh_1_flag.png)


### elasticsearch.yml

![](/assets/posts/ctf/CCE2019/sh_2.png)

- elasticsearch.yml 파일을 수정해서 localhost Bind 만 허용되게 하시오

![](/assets/posts/ctf/CCE2019/sh_2_conf.png)

![](/assets/posts/ctf/CCE2019/elasticsearchyml.png)
elasticsearch.yml은 처음 들어보는 파일이었다.
그래도 web.xml보다 훨씬 짧고 간단하다!
[Elasticsearch Network Settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html) Elasticsearch의 네트워크 설정에 관한 레퍼런스를 참고하면 `network.host`를 다음과 같이 설정할 수 있다.

![](/assets/posts/ctf/CCE2019/elasticsearch.png)

localhost Bind만 허용되게 해야하므로
`network.host: 0.0.0.0`를 `network.host: _local_`로 변경해주면 된다.

![](/assets/posts/ctf/CCE2019/sh_2_flag.png)


### Django

![](/assets/posts/ctf/CCE2019/sh_3.png)

- django 설정을 변경해서 DEBUG 모드를 Off하세요

Django는 한 번도 안써봤는데 elasticsearch.yml 보다 간단했다.

![](/assets/posts/ctf/CCE2019/sh_3_conf.png)

`설정 파일 폴더/django_proj/settings.py`를 수정하면 된다.

![](/assets/posts/ctf/CCE2019/djangosettings.png)

`DEBUG = True`를 `DEBUG = False`로 바꿔주기만 하면 된다.

![](/assets/posts/ctf/CCE2019/sh_3_flag.png)



시스템 하드닝 분야는 생소한 이름과는 다르게 점수를 거저주는 문제였다.
보안 설정에 대해 새로운걸 알게돼서 좋은 기회였다 :)
