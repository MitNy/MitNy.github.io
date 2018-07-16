---
layout: post
title: ! "[FreeACS] Ubuntu에 FreeACS 설치하기"
categories: [FreeACS]
excerpt: " "
comments: true
share: true
tags:
  - FreeACS
  - Ubuntu
  - install
---

## How to install FreeACS on Ubuntu 16.04
### 환경 : Ubuntu 16.04 LTS

`참고 : https://forum.mikrotik.com/viewtopic.php?t=116977
	https://github.com/freeacs`

```
sudo apt-get update

sudo apt-get install tomcat7

sudo apt-get install default-jre

sudo apt-get install mysql-server-5.5

sudo apt-get install git

(root) cd /tmp

sudo git clone https://github.com/freeacs/installation.git

(root) cd ubuntu

sudo bash install.sh
```

*우분투에서 tmp는 임시 디렉토리이므로 리부팅시 디렉토리 내에 있던 것들이 삭제됩니다.*
*설치 파일이 삭제되는 것을 원치않으시면 다른 디렉토리를 추천드립니다.*





