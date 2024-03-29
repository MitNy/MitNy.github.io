---
layout: post
title: ! "[DEFCON 2019 Quals] Redacted-Puzzle"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - CTF
  - Write-up
---

DEFCON 2019 Quals에 출제된 potpourri라는 분야의  Redacted-Puzzle 문제이다 최종 포인트는 110.

<!--more-->

`redacted`는 수정 된, 편집된 등의 뜻을 가지며 주로 redaction은 `black out(검게 지우는 것)` 과정을 거친다.

![](/assets/posts/ctf/DEFCON2019/redacted-puzzle.gif)
문제 파일도 검게 칠해져 있는 걸 확인할 수 있다.

![](/assets/posts/ctf/DEFCON2019/puzzle_frame.png)
`exiftool redacted-puzzle.gif` 명령으로 파일에 대한 정보를 알아냈다.
프레임 수가 총 35개라는 것을 알 수 있다.

![](/assets/posts/ctf/DEFCON2019/puzzle_identify.png)
`identify -verbose redacted-puzzle.gif` 명령으로 각 프레임의 colormap을 확인할 수 있다.

gif 파일을 각 프레임별로 추출해내면 총 35개의 이미지들이 있다.
![](/assets/posts/ctf/DEFCON2019/puzzle_convert.png)

![](/assets/posts/ctf/DEFCON2019/0.png)

첫번째 이미지를 보면 `FLAG ALPHABEY: +-=ABCDEFGHIJKLMNOPQRSTUVWXYZ_{}`로 플래그가 어떤 형태인지 알려준다.
처음에 이 이미지들을 보고 대체 뭐지 싶었는데 8각형의 꼭지점과 일치하면 1, 아니면 0의 값을 의미한다고 한다.

팔각형과 겹쳐보면 다음과 같다.
![](/assets/posts/ctf/DEFCON2019/0_edge.png)
![](/assets/posts/ctf/DEFCON2019/16_edge.png)

이런 과정을 반복해 모든 이미지의 값으로 리스트를 만들어준다.

```
['10001100', '01100011', '11100100', '01000110', '10000101', '00111101', '01000010', '10011000', '11100000', '11110100', '10000000', '00101101', '01110010', '00011100', '00001000', '10100101', '11010111', '01101110', '10100110', '10010001', '10111100', '10000100', '10000001', '10111001', '11010100', '00111011', '11001110', '11110010', '00011110', '10011101', '11001001', '11000111', '01100101', '00011110', '10011111']
```

위 값들을 하나의 변수로 합치면 이렇게 된다.
```
1000110001100011111001000100011010000101001111010100001010011000111000001111010010000000001011010111001000011100000010001010010111010111011011101010011010010001101111001000010010000001101110011101010000111011110011101111001000011110100111011100100111000111011001010001111010011111
```

DEFCON CTF의 플래그 형식은 OOO{} 인데, 앞 부분에 `100011000110001` 이렇게 똑같은 문자로 보이는 패턴이 있다.
이 부분만 우선 변환해보면 `10001 -> 17(DEC)` 이다. ASCII도 아니고 이건 또 무슨 의미인가.. 했다 ㅎㅎ

위에서 언급한 `+-=ABCDEFGHIJKLMNOPQRSTUVWXYZ_{}`를 +부터 0으로 세면 17은 O이다. 
이렇게 하면 171717은 OOO 이므로 플래그 형식처럼 생겼다!
코드로 짜는게 더 편할 것 같다.

```python
vertex = ['10001100', '01100011', '11100100', '01000110', '10000101', '00111101', '01000010', '10011000', '11100000', '11110100', '10000000', '00101101', '01110010', '00011100', '00001000', '10100101', '11010111', '01101110', '10100110', '10010001', '10111100', '10000100', '10000001', '10111001', '11010100', '00111011', '11001110', '11110010', '00011110', '10011101', '11001001', '11000111', '01100101', '00011110', '10011111']

vertex_join = "".join(vertex)
result = ""

flag_alphabet = "+-=ABCDEFGHIJKLMNOPQRSTUVWXYZ_{}"
for i in range(0,len(vertex_join),5):
    tmp = vertex_join[i:i+5]
    index = int(tmp,2) # Binary to Decimal
    result += flag_alphabet[index]

print(result)
```

바이너리를 합친 문자열을 5개씩 끊어 10진수로 변환 후, flag_alphabet의 해당하는 인덱스의 값을 다 더한다.

![](/assets/posts/ctf/DEFCON2019/puzzle_flag.png)

플래그:)



