---
layout: post
title: ! "[Ubuntu] Ubuntu 16.04 Let's Encrypt로 https 설정하기"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
tags:
  - Ubuntu
  - SSL
  - HTTPS
---

지난번에 OpenSSL을 통해 https로 접속을 할 수 있도록 설정한 사이트가 있었는데
'연결이 비공개로 설정되어 있지 않습니다.' 라는 메시지를 보고 싶지 않아서
`Let's Encrypt`를 사용하려고 한다.


### Let's Encrypt 설치하기
1. apt-get install letsencrypt
![]({{ site.baseurl }}/assets/posts/ubuntu/letsencryptInstall.png)

### 인증서 발급 받기
1. letsencrypt certonly --webroot --webroot-path=/var/www/html -d domain.com
- d 옵션으로 인증할 도메인의 주소를 설정할 수 있다. `-d domain -d domain` 처럼 다수의 도메인도 한 번에 설정할 수 있다.
- webroot-path에는 웹 서버의 기본 경로로 설정해주었다.

위 명령을 실행하면 다음과 같이 인증 만료 알림이나 키 복구를 위한 이메일을 입력하는 창이 뜬다.
![]({{ site.baseurl }}/assets/posts/ubuntu/letsEmail.png)

이메일 입력 후 동의하면 완료된다.
![]({{ site.baseurl }}/assets/posts/ubuntu/letsAgree.png)


인증서 발급이 성공적으로 끝나면 다음 메시지가 뜬다.
![]({{ site.baseurl }}/assets/posts/ubuntu/letsNote.png)

인증서의 위치는 `/etc/letsencrypt/liv/[domain]/` 위치에 있다
- cert.pem : 인증서 파일
- chain.pem : 인증서 발급자 파일
- fullchain.pem : cert.pem+chain.pem
- privkey.pem : 인증암호를 복호화하는 개인키

![]({{ site.baseurl }}/assets/posts/ubuntu/letsDir.png)

### 인증서 설정하기
1. /etc/apache2/sites-abailable/default-ssl.conf 파일 복사
- default-ssl.conf 파일을 [domain].conf 나 아무 파일명을 써서 복사한다.
- 이 글에선 back-ssl.conf를 사용합니다.
`sudo cp /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/back-ssl.conf`

2. 복사한 conf 파일 수정(back-ssl.conf 수정)
```
SSLEngine on
SSLProtocol all -SSLv2 -SSLv3
SSLCipherSuite ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA
 
SSLHonorCipherOrder on
 
SSLCertificateFile "/etc/letsencrypt/live/[폴더명]/cert.pem"
SSLCertificateKeyFile "/etc/letsencrypt/live/[폴더명]/privkey.pem"
SSLCertificateChainFile "/etc/letsencrypt/live/[폴더명]/chain.pem"
SSLOptions +FakeBasicAuth +ExportCertData +StrictRequire 주석 해제
```
![]({{ site.baseurl }}/assets/posts/ubuntu/letsSSL.png)
![]({{ site.baseurl }}/assets/posts/ubuntu/letsConfig.png)

3. back-ssl 활성화
`sudo a2ensite back-ssl`

4. 443 포트 접속 허용하기
`sudo ufw allow 443/tcp`

5. apache 재시작
`sudo service apache2 restart`

### 사이트 접속 확인
크롬 주소창에 '주의 요함','이 사이트는 보안 연결(HTTPS)이 사용되지 않았습니다.' 같은 메시지가 더 이상 뜨지 않는다.
![]({{ site.baseurl }}/assets/posts/ubuntu/letsPage.png)

다음은 http -> https 리다이렉션을 할 생각이다.
