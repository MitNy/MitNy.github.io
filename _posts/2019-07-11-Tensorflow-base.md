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


### constant
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

-------------------------------------------------------------------------------------------------------
### placeholder
계산할 때 입력을 받는 변수를 생성해줄 때 사용

```
X_1 = tf.placeholder(tf.float32, [2,2])
X_2 = tf.placeholder(tf.float32, [None,2])
print(X_1)
print(X_2)
```
![]({{ site.baseurl }}/assets/posts/tensorflow/tf_placeholder.png)

X_1은 실수형 텐서의 구조가 2차원 행렬 [2][2]의 구조를 가지고,<br>
X_2는 실수형 텐서의 구조가 2차원 행렬 [?][2]의 구조를 가진다.<br>
None은 크기가 정해져있지 않을 때 사용한다.<br>

matmul 등의 함수로 행렬을 계산해줄 수 있다.<br>

```
X_3 = tf.placeholder(tf.float32, [2,4])
x3_data = [[1,2,3,4],[4,3,2,1]]

W_1 = tf.placeholder(tf.float32, [4,2])
w1_data = [[0,1],[1,2],[2,3],[3,4]]

exp = tf.matmul(X_3, W_1)
session = tf.Session()
session.run(tf.global_variables_initializer())

print(session.run(exp, feed_dict={X_3:x3_data, W_1:w1_data}))

session.close()
```

![]({{ site.baseurl }}/assets/posts/tensorflow/tf_placeholder_mul.png)

`global_variables_initializer()`는 변수를 초기화해주는 함수이며, 초기화된 결과를 세션에 전달해주어야 한다.<br>

위에서 constant를 `session.run(상수명)` 이렇게 출력해줬다면<br>
placeholder는 계산할 수식을 정해두고 `feed_dict`를 이용해 값을 각 placeholder에 넣어줘야 한다.<br>
위 코드의 경우 X_3에는 x3_data의 값이, W_1에는 w1_data의 값이 들어가는 것이다.<br>

----------------------------------------------------------------------------------------------------------
### Variable

값이 계속 변하는 변수를 생성해줄 때 사용

```
X_4 = tf.placeholder(tf.float32, [2,2])
x4_data = [[4,5],[7,8]]

W_2 = tf.Variable(tf.random_normal([2,2]))

exp = tf.matmul(X_4, W_2)
session = tf.Session()
session.run(tf.global_variables_initializer())

print(session.run(W_2))
print(session.run(exp, feed_dict={X_4: x4_data}))
session.close()
```
![]({{ site.baseurl }}/assets/posts/tensorflow/tf_variable.png)

placeholder와 같이 응용하여 X_4는 [2][2] 행렬,<br>
Variable을 사용할 W_2도 마찬가지로 [2][2] 행렬이다.<br>
W_2의 값은 0과 1 사이의 정규분포 값으로 랜덤하게 생성된다. <br>




