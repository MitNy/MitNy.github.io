---
layout: post
title: ! "[Insomni'hack 2019] beginner_reverse"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - CTF
  - write-up
---


`Insomni'hack teaser 2019`에 출제된 `beginner_reverse` 문제이다. 
대회 당일에는 l33t-hoster를 봤었는데 서버도 닫히고 어려워서 포기했다ㅠㅜ
이 문제는 리버싱 문제인데 beginner니까 쉽지 않을까 하고 도전해봤다..

rust라는 언어로 되어있는 바이너리 파일이 주어지고, 바이너리를 실행하면 다음과 같이 입력을 할 수 있게 되어있다.
![](/assets/posts/ctf/Insomni/beginner_1.png)

GDB로 브레이크 포인트를 걸어봤는데 브레이크 포인트 설정이 안되는 것 같았다.

CTF에서 아이다를 쓸 일이 있으면 보통 String View를 먼저 보는 편인데
`an error occuredSubmit this and get you'r points!` 라는 문자열이 있다.
![](/assets/posts/ctf/Insomni/string.png)

이 문자열은 `beginer_reverse::main` 함수에 있다.
![](/assets/posts/ctf/Insomni/ida_2.png)

문자열의 아래 부분에 이 문제의 핵심이 존재한다.
![](/assets/posts/ctf/Insomni/ida_3.png)

`compare = ((*(compare_value + 4LL * index) >> 2) ^ 10) == *(v15 + 4LL * index)`
이 부분은 사용자가 입력한 값과 바이너리 내부의 비교하고자 하는 값을 한 글자씩 비교하는 것이다.
compare_value의 index를 2번 right shift한 값을 10(0xA)과 XOR한 값을 사용자의 입력 값과 비교한다.
그렇게 비교한 값의 참거짓(compare)를 result_1 변수에 더한다.
이 과정을 do while문으로 돌면서 result_1의 값이 34가 되면 LABEL_51 부분을 수행한다.
`&off_64f00`에는 위에서 언급한 문자열이 들어있다.

사용자가 입력한 값과 비교하고자 하는 값의 비교가 34번 참이어야 하는데,
문자열을 비교하는 문제라면 분명 바이너리 내에 문자열이 존재할 것이므로
그 문자열을 찾아 직접 계산해주면 된다.

compare_value의 0번째 인덱스에는 0x10E가 들어있고, 그 뒤로 4바이트 간격마다 인덱스의 값이 존재한다.
총34개의 값을 >>2 와 ^0xA 연산을 해주면 플래그가 나온다.
```py
compare = [0x10E, 0x112, 0x166, 0x1C6, 0x1CE, 0x0EA, 0x1FE, 0x1E2, 0x156, 0x1AE, 0x156, 0x1E2, 0x0E6, 0x1AE, 0x0EE, 0x156, 0x18A, 0x0FA, 0x1E2, 0x1BA, 0x1A6, 0x0EA, 0x1E2, 0x0E6, 0x156, 0x1E2, 0x0E6, 0x1F2, 0x0E6, 0x1E2, 0x1E6, 0x0E6, 0x1e2, 0x1de]
''.join([chr((i>>2)^0xA) for i in compare])
```

![](/assets/posts/ctf/Insomni/flag.png)
