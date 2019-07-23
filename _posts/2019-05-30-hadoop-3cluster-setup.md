---
layout: post
title: ! "[Hadoop] Hadoop 3-Cluster Setup"
categories: [Hadoop]
excerpt: " "
comments: true
share: true
tags:
  - Hadoop
  - multi-node
  - setup
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/39_clear.png)

* Hadoop 및 그 외 환경이 세팅된 이후의 과정입니다
* [참고사이트](https://medium.com/ymedialabs-innovation/apache-spark-on-a-multi-node-cluster-b75967c8cb2b)

### 환경
- Hadoop 2.9.2
- Ubuntu 18.04
- Open-jdk
- VirtualBox

### 3개의 노드 만들기

![]({{ site.baseurl }}/assets/posts/hadoop/vb_list.png)
VirtualBox에서 동일한 환경을 가진 가상머신 3개를 만들어준다.
여기서 1개는 Master node, 나머지 2개는 Slaves node 가 된다.
![]({{ site.baseurl }}/assets/posts/webhackingkr/vb_host_networks.png)
`메뉴 > 파일 > 호스트 네트워크 관리자`에서 네트워크를 추가해준다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/vb_vm_networks.png)
각 가상머신들의 네트워크 설정에서 호스트 전용 어댑터를 설정해준다.


1. /etc/netplan/50-cloud-init.yaml 수정
![]({{ site.baseurl }}/assets/posts/webhackingkr/edit_netplan.png)

2. /etc/hosts 수정
![]({{ site.baseurl }}/assets/posts/webhackingkr/edit_hosts.png)
3개 노드의 각 IP를 적어두고 저장한다.

3. ${HADOOP_HOME}/etc/hadoop/core-site.xml 수정
![]({{ site.baseurl }}/assets/posts/webhackingkr/core-site.png)

4. ${HADOOP_HOME}/etc/hadoop/hdfs-site.xml 수정
![]({{ site.baseurl }}/assets/posts/webhackingkr/hdfs-site.png)

5. ${HADOOP_HOME}/etc/hadoop/mapred-site.xml 수정

6. ${HADOOP_HOME}/etc/hadoop/yarn-site.xml 수정

7. ${HADOOP_HOME}/etc/hadoop/slaves 수정

8. 각 노드로 파일 복사
`scp core-site.xml mapred-site.xml hdfs-site.xml yarn-site.xml slaves ${HOSTNAME}:${HADOOP_HOME}/etc/hadoop/`


9. 


