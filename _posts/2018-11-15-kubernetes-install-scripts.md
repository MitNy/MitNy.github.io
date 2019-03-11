---
layout: post
title: ! "[Kubernetes] Installing Scripts"
categories: [Kubernetes]
excerpt: " "
comments: true
share: true
tags:
  - kubernetes
  - shell script
---

쿠버네티스 설치를 위한 쉘스크립트입니다.
직접 작성하였고, 간헐적으로 apt-get update 에러로 인한 설치가 안되는  현상이 나타날 수도 있습니다.

# kuber.sh
```sh
#!/bin/sh

SCRIPTPATH=$( cd "$(dirname "$0")" ; pwd )
apt-get update
apt-get install -y curl 
export VERSION=18.06 && curl -sSL get.docker.com | sh # 도커18.06 버전 설치
#curl -fsSl https://get.docker.com/ | sudo sh # 도커 최신 버전 설치 (버전 호환 X)
usermod -aG docker $USER # 현재 접속중인 사용자에게 권한주기
swapoff -a # swap 비활성화
apt-get update && apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl
docker info | grep -i cgroup # 도커 cgroup drive 확인
sed -e '5 i\Environment="KUBELET_CGROUP_ARGS=--cgroup-driver=cgroupfs"\n' /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
sed -i "s/cgroup-driver=systemd/cgroup-driver=cgroupfs/g" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
kubeadm init # 마스터 초기화
```

# regular_kuber.sh
```sh
#!/bin/sh

# 스크립트 경로에서 실행
mkdir -p ./.kube
sudo cp -i /etc/kubernetes/admin.conf ./.kube/config
sudo chown $(id -u):$(id -g) ./.kube/config
kubectl apply -f https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n') # 네트워크 배포 
kubectl get nodes
```

# 실행 방법
1. chmod +x kuber.sh
2. chmod +x regular_kuber.sh
3. source kuber.sh; su - {user name} -c "source regular_kuber.sh"
