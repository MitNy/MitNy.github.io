---
layout: post
title: ! "[Pwnable.kr] blackjack"
categories: [Pwnable.kr]
excerpt: " "
comments: true
share: true
tags:
  - Pwnable.kr
---

![]({{ site.baseurl }}/assets/posts/pwnkr/blackjack.png)

1pt짜리 문제로 블랙잭이라는 카드 게임을 할 수 있다.

![]({{ site.baseurl }}/assets/posts/pwnkr/blackjack_start.png)
![]({{ site.baseurl }}/assets/posts/pwnkr/blackjack_500.png)

nc로 접속하면 바로 "Are You Ready?" 가 뜨면서 게임을 시작할 수 있다.
1번을 눌러서 게임 시작.<br>
처음엔 500달러를 기본으로 가지고 있고 딜러와 카드를 한장씩 받아 21에 가까운 수를 만드는 사람이 이기고 21을 초과하면 지는 게임이다.
<br>숫자는 랜덤하게 나오고 베팅을 할 수 있다.
<br>숫자가 나오는 것에 따라 카드를 더 뽑을 것인지(H), 차례를 마칠 것인지(S) 선택한다.
<br>문제 설명에 보면 `I like to give my flags to millionares.` 라고 써있으니 돈을 많이 모아야 되는 것 같다
.

져도 1달러씩은 증가해서 1씩 증가시키는 걸 100만번 하면 될까 했지만 너무 무모했다.

[소스코드](http://cboard.cprogramming.com/c-programming/114023-simple-blackjack-program.html)

서버에 따로 코드 파일이 있진 않고 따로 URL을 준다.
위 URL에 접속하면 소스코드를 볼 수 있다.

```cpp
int betting() //Asks user amount to bet
{
 printf("\n\nEnter Bet: $");
 scanf("%d", &bet);
 
 if (bet > cash) //If player tries to bet more money than player has
 {
        printf("\nYou cannot bet more money than you have.");
        printf("\nEnter Bet: ");
        scanf("%d", &bet);
        return bet;
 }
 else return bet;
} // End Function
```

문제의 핵심인 부분인데 베팅할 때 가지고 있는 돈과 베팅 금액을 비교하는데
가지고 있는 돈보다 베팅 금액이 클 경우 다시 입력하도록 한다.<br>
그런데 한 번만 비교를 하고 이후부터는 비교를 하지않는다.<br>
그래서 엄청 큰 금액을 입력해도 상관이 없다.

![]({{ site.baseurl }}/assets/posts/pwnkr/blackjack_1.png)

![]({{ site.baseurl }}/assets/posts/pwnkr/blackjack_2.png)

큰 금액을 베팅하고 한 번만 이기면 된다!

`YaY_I_AM_A_MILLIONARE_LOL`

