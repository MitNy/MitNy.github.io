---
layout: post
title: ! "[Ubuntu] swapoff -a 에러 해결"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
tags:
  - swapoff
  - Ubuntu
  - error
  - kubernetes
---

## Ubuntu swapoff -a error
### 환경 : Ubuntu 16.04 LTS

Kubernetes 사용을 위해 `swapoff -a`를 해줘야 하는데
`swapoff: /dev/sda5: swapoff failed: Cannot allocate memory`

이런식으로 메모리를 할당할 수 없다는 에러가 발생하였다.

swapoff는 충분한 메모리를 할당할 수 없는 경우 실패하도록 설계되어 있고
실제 메모리의 양이 swap에서 차지한 양보다 적을 경우 끌 수 없다.

`echo "3" > /proc/sys/vm/drop_caches`

위와 같이 캐시 메모리를 삭제하거나
Virtual Machine 자체의 메모리를 증가시켜 주면 된다.
또는 모든걸 해결해주는 재부팅..

다시 swapoff -a 를 해주고 `free -m`으로 메모리를 확인하면 성공적으로 꺼진 것을 확인할 수 있다.
![]({{ site.baseurl }}/assets/posts/ubuntu/freem.png)
