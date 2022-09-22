---
layout: post
title: ! "[Pwnable.kr] random"
categories: [Pwnable.kr]
excerpt: " "
comments: true
share: true
tags:
  - Pwnable.kr
  - random
---

passcode 문제를 풀다가 잘 안돼서 다른 문제로 넘어왔다ㅎㅎ
알고보니 passcode 문제는 무려 10point 짜리 문제였다! 순서대로 푸는 건줄 알았는데...
아직 시스템 초보이므로 point가 낮은 것부터 차근차근 풀기로 했다.
그래서 고른 문제가 random

![](/assets/posts/pwnkr/random.png)

random.c 의 코드는 다음과 같다.
```c
#include <stdio.h>



int main(){
	unsigned int random;
	random = rand();	// random value!
	unsigned int key=0;
	scanf("%d", &key);

	if( (key ^ random) == 0xdeadbeef ){
		printf("Good!\n");
		system("/bin/cat flag");
		return 0;
	}
	printf("Wrong, maybe you should try 2^32 cases.\n");
	return 0;
}
```

rand() 함수로 random value를 random 변수에 저장한다.
key는 0으로 초기화 되어있고, key를 입력받는다.
key와 random 을 XOR 했을 때, 0xdeadbeef와 일치하면 flag를 출력해준다.
어떻게 어떤 값이 나올지 모르는 random value와 사용자 입력 key를 XOR 해서 deadbeef를 만들까?

0xdeadbeef ^ x 는 일정한 값이고,  계산된 값을 다시 x로 XOR하면 0xdeadbeef가 나오게 된다.

예를 들어,
0xdeadbeef ^ 1234 = 0xdeadacd8 이고
0xdeadacd8 ^ 1234 = deadbeef 이다.

찾아보니, 같은 seed 에선 생성되는 random value도 같다고 한다.
그렇다면 항상 같은 random value와 0xdeadbeef를 XOR 시킨 값을 다시 random value와 XOR 시키면 되기 때문에,
코드를 짜서 key값을 출력하도록 하고, 출력된 키 값을 random을 실행시킨 후 입력하면 될 것 같다.

![](/assets/posts/pwnkr/random_code.png)

이런식으로 rand() 함수로 random value를 생성하고, 0xdeadbeef와 XOR 한 값을 key에 저장한다.

![](/assets/posts/pwnkr/random_key.png)

`key = 3039230856`
이 숫자를 입력해주면 된다.

![](/assets/posts/pwnkr/random_clear.png)
