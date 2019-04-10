---
layout: post
title: ! "[VolgaCTF 2019 Qualifier] JOI"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - stego
  - CTF
  - write-up
---

2019 Volga CTF 예선 150 포인트짜리 문제이다.

![]({{ site.baseurl }}/assets/posts/ctf/Volga2019/result.png)
QR 코드 이미지가 있고 인식을 해보면
`C_F(n1, n2) = 14 * [C(n1,n2) / 14] + 7 * FLAG(n1,n2) + (C(n1,n2) mod 7)` 라는 값이 뜬다.

계산을 해야될 것 같지만 우리는 저 함수들이 어떤건지 모른다..
그리고 위의 이미지를 자세히 보면 진한 부분 주변에 연하게 QR 무늬가 있는 것을 볼 수 있다.

StegSolve 툴을 사용해서 위 이미지를 요리조리 변환시키다 보면
Red plane 5,7 / Green plane 5,7 / Blue plane 5,7 에서는
`C_F(n1, n2) = 14 * [C(n1,n2) / 14] + 7 * FLAG(n1,n2) + (C(n1,n2) mod 7)` 가 뜨고
Red plane 0 / Green plane 0 / Blue plane 0 에서는
![]({{ site.baseurl }}/assets/posts/ctf/Volga2019/qr_flag.png)
![]({{ site.baseurl }}/assets/posts/ctf/Volga2019/joi_flag.png)

플래그가 뜬다!!
`VolgaCTF{5t3g0_m4tr3shk4_in_4cti0n}`

다른 분들의 롸업을 보다가 좋은 툴도 알게 되었다.
`zbarimg` 라는 툴로 이미지에서 바코드를 스캔 및 디코딩 해준다.
사용하면 아래와 같이 QR 코드 스캔 결과를 출력해준다!
![]({{ site.baseurl }}/assets/posts/ctf/Volga2019/zbarimg.png)
![]({{ site.baseurl }}/assets/posts/ctf/Volga2019/zbarimg_flag.png)



