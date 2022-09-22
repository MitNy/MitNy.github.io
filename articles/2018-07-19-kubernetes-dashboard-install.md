---
layout: post
title: ! "[Kubernetes] Kubernetes dashboard 설치"
categories: [Kubernetes]
excerpt: " "
comments: true
share: true
tags:
  - Kubernetes
  - Ubuntu
  - dashboard
  - install
---

## How to install Kubernetes dashboard
### 환경: Ubuntu 16.04 LTS

[참고](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

`kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml`
로 설치를 하면 아래와 같이 여러가지가 생성된다. 
![](/assets/posts/kubernetes/kube_dash_install.png)

`kubectl proxy`로 프록시를 켜주고 좀 기다리면 대시보드 페이지에 접속할 수가 있다.
![](/assets/posts/kubernetes/kube_proxy.png)

`http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/`
로 접속을 해보면 로그인 페이지를 볼 수 있다.

![](/assets/posts/kubernetes/kube_dash_main.png)

Kubeconfig,Token 중에 하나를 선택해서 로그인을 할 수 있는데
master join할 때 쓰던 토큰인가 해서 입력해봤더니 아니었다.

`kubectl -n kube-system get secret` 을 입력하면 목록들이 쭉 뜨는데 여기서 `deployment-controller-token`을 찾아야한다.
![](/assets/posts/kubernetes/kube_get_secret.png)

`kubectl -n kube-system describe secret deployment-controller-token-(    )` 를 입력 해주면 token 값이 나온다.
![](/assets/posts/kubernetes/kube_token.png)

엄청 긴 토큰을 로그인 페이지 Token값에 넣어주고 로그인 하면 대시보드 페이지로 들어갈 수 있다.
![](/assets/posts/kubernetes/kube_dash.png)

