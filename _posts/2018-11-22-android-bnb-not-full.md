---
layout: post
title: ! "[Android] BottomNavigationBar width not full"
categories: [Android]
excerpt: " "
comments: true
share: true
tags:
  - Android
---

어플리케이션을 만드는데 아래처럼 BottomNavigationBar가 화면에 꽉차지 않는 문제가 발생하였다.
![]({{ site.baseurl }}/assets/posts/android/bnb_not_full.png)


![]({{ site.baseurl }}/assets/posts/android/bnb_full_code.png)


`android:background="@color/colorBorder"` 를 추가하여 backgroud와 itemBackgroud의 색을 같게 해준다.

![]({{ site.baseurl }}/assets/posts/android/bnb_full.png)

