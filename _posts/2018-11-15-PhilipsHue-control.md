---
layout: post
title: ! "[IoT] Philips Hue Control"
categories: [IoT]
excerpt: " "
comments: true
share: true
tags:
  - IoT
  - Philips Hue
---

Philips Hue란 인터넷으로 제어할 수 있는 전구이다.
앱도 있어서 브릿지만 연결되어 있다면 범위 내에서 밝기, 색상, 전원 등을 컨트롤 할 수 있다.
Philips Hue 1.0 스타터 킷을 사용했다.

![]({{ site.baseurl }}/assets/posts/iot/hue.png)

### 환경
1. Ubuntu 16.04 LTS 와 Raspbian Stretch with desktop
2. Raspberry Pi 3

### 작동 원리
![]({{ site.baseurl }}/assets/posts/iot/hueWork.png)

앱으로 Hue를 컨트롤 할 수도 있지만 컴퓨터로 제어 해볼 것이다.
그렇다고 앱을 안깔아도 되는 것은 아니다!
공유기와 연결한 브릿지를 앱에서 검색하면 Bridge IP를 확인할 수 있는데, 이 IP가 있어야만 컨트롤 할 수 있다.

1. Python phue 모듈 설치
`sudo pip3 install phue`
[https://github.com/studioimaginaire/phue](https://github.com/studioimaginaire/phue)

2. 전원 제어
- lights[hue 전구 인덱스].on/off = True/False
```py
from phue import Bridge

b = Bridge("Bridge IP")
b.connect()

lights = b.lights
print(lights)

for i in range(0,len(lights)):
	if i==0:
		lights[i].on = True
	elif i==1:
		lights[i].on = False
	elif i==2:
		lights[i].on = True
```

3. 밝기 제어
- lights[hue 전구 인덱스].brightness = 0~254
- 숫자가 커질 수록 밝아진다

```py
from phue import Bridge

b = Bridge("Bridge IP")
b.connect()

lights = b.lights
print(lights)
for i in range(0,len(lights)):
	if i==0:
		lights[i].brightness=0
	elif i==1:
		lights[i].brightness=100
	elif i==2:
		lights[i].brightness=254
```

4. 색상 제어
- lights[hue 전구 인덱스].xy = [0~1,0~1]
```py
from phue import Bridge

b = Bridge("192.168.0.135")
b.connect()

lights = b.lights
print(lights)
for i in range(0,len(lights)):
	if i==0:
		lights[i].xy = [0.1,0.1]
	elif i==1:
		lights[i].xy = [0.5,1]
	elif i==2:
		lights[i].xy = [0.7,0.3]
```

5. 세 가지 제어를 웹 페이지에서 하기
()
