---
layout: post
title: ! "[Kubernetes] Kubernetes 설치부터 노드 join까지"
categories: [Kubernetes]
excerpt: " "
comments: true
share: true
tags:
  - Kubernetes
  - Ubuntu
  - install
  - join
---

## How to install and node join Kubernetes
### 환경: Ubuntu 16.04 LTS

1. master로 쓸 VM 하나와 node로 쓸 VM 하나를 준비한다.
2. 아래의 설치 과정을 동일하게 진행한다.

### hostname 변경하는 방법
```
1. vi /etc/hosts 에서 변경
2. hostnamectl set-hostname 호스트네임

확인: $ hostname
```

도커는 설치되어 있다는 전제하에 포스팅합니다!

`swapoff -a`

### Kubernetes 설치
```
sudo apt-get update && apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add –
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo apt-get update
sudo apt-get install kubelet kubeadm kubectl
```

`docker info | grep -i cgroup`

`sudo vi /etc/systemd/system/kubelet.service.d/10-kubeadm.conf`
-> Environment="KUBELET_CGROUP_ARGS=--cgroup-driver=cgroupfs" 추가
![]({{ site.baseurl }}/assets/posts/kubernetes/kube_conf.png)

`sed -i "s/cgroup-driver=systemd/cgroup-driver=cgroupfs/g" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf`


아래 과정부터는 master와 node가 구분된다.
## master
### master 초기화
`kubeadm init`

kubeadm init 시 아래와 같은 에러가 발생할 수도 있다.
```
[preflight] Some fatal errors occurred:
	[ERROR ImagePull]: failed to pull image [k8s.gcr.io/kube-apiserver-amd64:v1.11.1]: exit status 1
	[ERROR ImagePull]: failed to pull image [k8s.gcr.io/kube-controller-manager-amd64:v1.11.1]: exit status 1
	[ERROR ImagePull]: failed to pull image [k8s.gcr.io/kube-scheduler-amd64:v1.11.1]: exit status 1
	[ERROR ImagePull]: failed to pull image [k8s.gcr.io/kube-proxy-amd64:v1.11.1]: exit status 1
```

![]({{ site.baseurl }}/assets/posts/kubernetes/kube_version_error.png)

버전과 관련된 에러이기 때문에 `kubeadm init --kubernetes-version=1.11.0` 이렇게 버전 옵션을 따로 줘서 해결할 수 있다.

초기화가 정상적으로 됐다면 아래와 같은 화면을 볼 수 있다.
![]({{ site.baseurl }}/assets/posts/kubernetes/kube_init.png)

root가 아닌 regular user로 아래 명령어들을 입력해주면 된다. regular user로 돌아가고 싶다면 `su (username)`

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

네트워크 배포도 필요한데 [https://kubernetes.io/docs/concepts/cluster-administration/addons/](https://kubernetes.io/docs/concepts/cluster-administration/addons/) 이 곳에서 원하는 네트워크를 선택해 `kubectl apply -f [podnetwork].yaml` 명령어를 입력해주면 된다.
네트워크들에 대한 설명은 써있는데 무슨 차인지는 더 공부해봐야 될 것 같다..

calico 네트워크 배포
![]({{ site.baseurl }}/assets/posts/kubernetes/kube_calico.png)


node가 master로 join하기 위한 명령어도 주어진다. 이 명령어는 node에서 사용하는 것이다.

join 전에는 master만 존재한다.
![]({{ site.baseurl }}/assets/posts/kubernetes/kube_join_before.png)

## node
설치와 설정이 완료된 node 서버에서 join 명령어를 입력해준다.
![]({{ site.baseurl }}/assets/posts/kubernetes/kube_join.png)

join이 성공적으로 되면 master 서버에서 `kubectl get nodes` 명령어로 join된 node들을 볼 수 있다.

![]({{ site.baseurl }}/assets/posts/kubernetes/kube_join_done.png)

