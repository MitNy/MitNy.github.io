---
layout: post
title: ! "[TensorFlow] TensorFlow 기초"
categories: [TensorFlow]
excerpt: " "
comments: true
share: true
tags:
  - TensorFlow
---


1. constant
텐서플로우에서 상수를 생성해줄 때 사용

```
test = tf.constant("TEST")
print(test)

sess = tf.Session()
print(sess.run(test))
```
위와 같이 원하는 값을 생성해줄 수 있다. <br>
하지만 일반적인 언어의 변수 선언과는 다르게 바로 사용하면 생성해준 값을 얻을 수 없다.

![]({{ site.baseurl }}/assets/posts/tensorflow/tf_constant.png)
위 코드를 실행한 결과로, 단순히 생성 후 `print(test)`를 해주게 되면 텐서의 타입 등이 출력된다.<br>
shape이 ()이면 상수 텐서라는 의미이다.<br>
TEST 문자열을 얻고 싶다면 그래프를 실행할 Session을 만들어주어야 한다. <br>
Session 생성 후 실행하고자 하는 텐서 그래프(변수, 수식 등)를 run 함수로 실행시키면 된다.<br>


2. placeholder
계산할 때 입력을 받는 변수를 생성해줄 때 사용

```
X_1 = tf.placeholder(tf.float32, [2,2])
X_2 = tf.placeholder(tf.float32, [None,2])
print(X_1)
print(X_2)
```
![]({{ site.baseurl }}/assets/posts/tensorflow/tf_placeholder.png)

X_1은 실수형 텐서의 구조가 2차원 배열 [2][2]의 구조를 가지고,<br>
X_2는 실수형 텐서의 구조가 2차원 배열 [?][2]의 구조를 가진다.<br>
None은 크기가 정해져있지 않을 때 사용한다.




