---
layout: post
title: ! "[Facebook CTF 2019] Products Manager"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - CTF
  - write-up
---



Facebook CTF에 출제된 100 포인트짜리 웹 문제 `Products Manager`이다

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/products_manager.png)
![]({{ site.baseurl }}/assets/posts/ctf/Facebook/products_manager_main.png)

소스코드가 주어지고 들어가보면 `View top 5 products`, `Add your own product`, `View details of your own product` 세 가지 기능이 있다.<br>

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/db_php_code.png)
코드를 보면 친절하게도 플래그가 어디있는지까지 알려준다!!

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/get_top_product.png)
`View top 5 products`는 문제 페이지에 들어갔을 때 처음보이는 기능 그대로 테이블의 위에서5개 데이터를 불러온다.

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/get_product.png)
`View details of your own product`는 상품의 이름으로 검색한 후 상품을 추가할 때 입력했던 상세정보도 같이 불러온다.


상품을 추가할 땐 Secret 값을 입력해주어야 하는데, Secret값을 체크하는 함수도 있다.
![]({{ site.baseurl }}/assets/posts/ctf/Facebook/get_product.png)

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/handle_post.png)
`view.php`의 `handle_post()` 함수를 보면 `View details of your own product` 를 이용할 때<br>
입력하는 name과 secret 값이 존재하는지, Null이 아닌지 검사한 후<br>
check_name_secret()의 결과를 검사한다. False가 아니면 상품 정보를 출력해준다.<br>
그런데 위의 get_product() 함수는 `WHERE name = ? and secret = ?`이 아닌 name만으로 데이터를 반환해준다.<br>
name이 facebook이지만 secret은 내가 알고있는 값이라면? name과 secret을 일치시켜 facebook이라는 이름을 가진
첫 번째 상품을 반환시킬 수 있다.

하지만 이미 `facebook`이라는 이름은 존재하기 때문에 추가시킬 수 없다.<br>
뒷부분에 공백을 추가해 `facebook `을 name으로 임의의 값을 secret으로 해주면 상품을 추가할 수 있다.<br>
이 문제에선 `MitNy1234567890`을 사용했다.

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/add_success.png)

추가가 되었다면 `View details of your own product`으로 가서<br>
Name:`facebook `<br>
Secret: MitNy1234567890  <br> 를 입력해보자

![]({{ site.baseurl }}/assets/posts/ctf/Facebook/products_manager_flag.png)

플래그!!
