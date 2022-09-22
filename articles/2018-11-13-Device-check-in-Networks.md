---
layout: post
title: ! "[Networks] 네트워크 내에 특정 디바이스가 존재하는지 검사하기"
categories: [Networks]
excerpt: " "
comments: true
share: true
tags:
  - Networks
---

### 환경
1. Raspberry Pi 3
2. Raspbian Stretch with desktop

### DHCP 패킷 캡쳐
1. 라즈베리파이 환경에서 raw_socket을 사용해 패킷을 스니핑한다.
2. 패킷 중 포트 번호가 67, 68인 패킷(DHCP)만을 모니터링 한다.
* DHCP(Dynamic Host Configuration Protocol) : 네트워크 상에서 동적으로 IP를 할당 해주는 프로토콜
3. DHCP 패킷의 Ethernet 헤더에 있는 MAC address를 파싱한다. struct 모듈 사용.
* DHCP가 IP를 할당해주는 부분이 캡쳐되지 않아서 MAC address로 IP를 알아낼 것이다.

### 디바이스 체크
타겟 디바이스의 MAC address가 파싱한 MAC address와 일치할 경우 디바이스 검사 함수를 호출한다. <br>
`arp -a` 명령어를 실행해 모든 arp 테이블을 확인하고 그 결과를 저장한다.<br>
실행 결과는 다음과 같이 나타난다.

![](/assets/posts/networks/arp.png)

`디바이스명 (IP) at MAC address ~~` 포맷이어서 () 괄호 안에 있는 문자열만 파싱하도록 정규식 `r'\((.*?)\)'` 을 사용했다. <br>
IP가 제대로 파싱이 됐으면 해당 IP로 ping을 보낸다.
해당 디바이스에서 ping을 제대로 받았다면 0을 반환해주므로 pong의 값이 0일 경우 네트워크 상에 디바이스가 존재한다는 것이다.
쓰레드 타이머를 사용해 3초마다 이 검사를 반복한다.

```py
def device_check():
    device = False
    ip_addr = ""
    check = os.popen("arp -a").readlines()
    for i in range(0,len(check)):
        if target_mac in check[i]:
            ip_addr = re.findall(r'\((.*?)\)',check[i])
    if len(ip_addr) > 0 :
        pong = os.system("ping -c 1 "+ip_addr[0])
        if pong == 0:
            print("[+] Device in Networks")
        else:
            print("[-] No Device in Networks")
            for j in range(0,len(lights)): # 디바이스가 발견되지 않을 경우 Philips Hue 전구 전원 끄기
                lights[j].on = False
    threading.Timer(3,device_check).start()
```

### 데모 영상
<iframe width="893" height="595" src="https://www.youtube.com/embed/TglscGmtVQY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
