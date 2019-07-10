---
layout: post
title: ! "[TensorFlow] Anaconda for Windows에 TensorFlow 설치하기"
categories: [TensorFlow]
excerpt: " "
comments: true
share: true
tags:
  - Windows
  - Anaconda
  - TensorFlow
---

1. 환경 구축
  - IDE: Anaconda 2019.03 (64-bit)
  - Python version: 3.7

2. 필수 업데이트
  * Anaconda Prompt에서 아래 명령어 실행
![]({{ site.baseurl }}/assets/posts/tensorflow/anaconda_prompt.png)

  - conda 업데이트

`conda update -n base conda`
![]({{ site.baseurl }}/assets/posts/tensorflow/base_conda_update.png)

  - 파이썬 패키지 업데이트

`conda update --all`
![]({{ site.baseurl }}/assets/posts/tensorflow/conda_update.png)

3. TensorFlow 설치

`conda install tensorflow` (tensorflow 1.9.0 버전부터 pip 대신 conda 사용 권장)

![]({{ site.baseurl }}/assets/posts/tensorflow/tensorflow_install.png)

- Python 쉘로 tensorflow 설치 확인
![]({{ site.baseurl }}/assets/posts/tensorflow/tensorflow_install_check.png)

4. Jupyter Notebook 실행
  - 실행 방법
     - Anaconda Navigator에서 Jupyter Notebook Launch 
     - Anaconda prompt에서 jupyter notebook 명령어 입력

![]({{ site.baseurl }}/assets/posts/tensorflow/jupyter_list.png)
실행되면 로컬로 웹 페이지가 하나 뜬다. 디렉토리 목록이 뜨고 아무곳이나 선택해서 파일 등을 생성할 수 있다.

![]({{ site.baseurl }}/assets/posts/tensorflow/jupyter_check.png)

위에서 Python 쉘로 확인한 것 처럼 Jupyter Notebook에서 import 후 실행시켜 설치가 잘 되었는지 확인해야 한다.

