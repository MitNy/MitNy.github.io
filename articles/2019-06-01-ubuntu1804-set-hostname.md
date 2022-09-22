---
layout: post
title: ! "[Ubuntu] Ubuntu 18.04 hostname 변경하기"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
tags:
  - Ubuntu
  - hostname
---

Ubuntu 18.04 이전 버전에서는 간단하게 호스트 네임을 변경할 수 있었는데
18.04부터는 추가적으로 수정해주어야 할 부분이 있다.

### /etc/cloud/cloud.cfg 파일 수정하기
`/etc/cloud/cloud.cfg` 파일에서 `preserve_hostname` 부분이 `false`로 되어있다면 `true`로 변경해준다.

### hostnamectl 명령으로 변경
`hostnamectl set-hostname [hostname]` 입력 후 `reboot`

### /etc/hostname 파일 변경
`/etc/hostname` 안의 hostname 변경 후 `reboot`
