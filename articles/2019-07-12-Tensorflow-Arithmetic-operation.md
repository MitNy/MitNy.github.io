---
layout: post
title: ! "[TensorFlow] TensorFlow 산술 연산"
categories: [TensorFlow]
excerpt: " "
comments: true
share: true
tags:
   - TensorFlow
---

텐서플로우의 덧셈, 뺄셈, 곱셈, 나눗셈 등 산술 연산 함수 예시

```py
import tensorflow as tf

c1, c2 = tf.constant([2]), tf.constant([3,5])
v1, v2 = tf.Variable([9]), tf.Variable([6,4])
session = tf.Session()
session.run(tf.initialize_all_variables())

print("====== ADD ======")
print(session.run(tf.add(c1,v1))) # [11]
print(session.run(tf.add(c2,v2))) # [9 9]
print(session.run(tf.add([c2,v2],[c2,v2]))) #[[6 10][12 8]]

print("\n====== SUBTRACT ======")
print(session.run(tf.subtract(c1,v1))) # [-7]
print(session.run(tf.subtract(c2,v2))) # [-3 1]

print("\n====== MULTIPLY ======")
print(session.run(tf.multiply(c1,v1))) # [18]
print(session.run(tf.multiply(c2,v2))) # [18 20]

print("\n====== DIVIDE ======")
print(session.run(tf.divide(c1,v1))) # [0.22222222]
print(session.run(tf.divide(c2,v2))) # [0.5 1.25]

print("\n====== TRUEDIV ======")
print(session.run(tf.truediv(c1,v1))) # [0.22222222]
print(session.run(tf.truediv(c2,v2))) # [0.5  1.25]

print("\n====== FLOORDIV ======")
print(session.run(tf.floordiv(c1,v1))) # [0]
print(session.run(tf.floordiv(c2,v2))) # [0 1]

print("\n====== MOD ======")
print(session.run(tf.mod(c1,v1))) # [2]
print(session.run(tf.mod(c2,v2))) # [3 1]

session.close()
```

truediv와 floordiv는 처음 보는 함수였는데, truediv는 divide와 동일하게 `x/y` 연산을 해주는 함수이고<br>
floordiv는 `x//y` 연산을 해주는 함수이다.

![](/assets/posts/tensorflow/tensorflow_arithmeticOperation_result.png)
