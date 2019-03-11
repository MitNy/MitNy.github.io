---
layout: post
title: ! "[MySQL] 테이블에 한글 데이터 입력 시 오류 해결"
categories: [MySQL]
excerpt: " "
comments: true
share: true
tags:
  - MySQL
  - 한글
  - error
---

insert로 테이블에 한글로 정보를 입력할 때 다음과 같은 오류가 발생하였다.

![]({{ site.baseurl }}/assets/posts/mysql/mysql_hangul_error.png)
```
ERROR 1366 (HY000): Incorrect string value: '\xEC\x9D\xB4\xEB\xAF\xB8...' for column 'name' at row 1
```

개인 서버도 아니라 root 권한이 없어서 다른 해결 방법을 찾아야만 했다.

## ALTER TABLE (테이블명) convert to charset utf8;

으로 테이블 설정을 바꿔줬더니 한글로 데이터 입력이 가능해졌다.

![]({{ site.baseurl }}/assets/posts/mysql/mysql_hangul_resolve.png)
