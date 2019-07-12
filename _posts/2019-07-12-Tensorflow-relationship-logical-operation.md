---
layout: post
title: ! "[TensorFlow] TensorFlow 관계 연산과 논리 연산"
categories: [TensorFlow]
excerpt: " "
comments: true
share: true
tags:
  - TensorFlow
  - operation
---

텐서플로우의 관계 연산, 논리 연산 함수 예시

### 관계 연산

```py
import tensorflow as tf

c1, c2, c3 = tf.constant([2,3]), tf.constant([5.0, 4.0]), tf.constant([1])
v1, v2 = tf.Variable([1,3]), tf.Variable([5.0, 3.0])
session = tf.Session()
session.run(tf.initialize_all_variables())

print("====== EQUAL ======")
print(session.run(tf.equal(c1,v1))) # [False True]
print(session.run(tf.equal(c2,v2))) # [True False]

print("\n====== NOT EQUAL ======")
print(session.run(tf.not_equal(c1,v1))) # [True False]
print(session.run(tf.not_equal(c2,v2))) # [False True]

print("\n====== LESS ======")
print(session.run(tf.less(c1,v1))) # [False False]
print(session.run(tf.less(c2,v2))) # [False False]

print("\n====== LESS EQAUL ======")
print(session.run(tf.less_equal(c1,v1))) # [False True]
print(session.run(tf.less_equal(c2,v2))) # [True False]

print("\n====== GREATER ======")
print(session.run(tf.greater(c1,v1))) # [True False]
print(session.run(tf.greater(c2,v2))) # [False True]

print("\n====== GREATER EQUAL ======")
print(session.run(tf.greater_equal(c1,v1))) # [True True]
print(session.run(tf.greater_equal(c2,v2))) # [True True]

session.close()
```

![]({{ site.baseurl }}/assets/posts/tensorflow/tensorflow_relationshipOperation_result.png)


### 논리 연산

```py
import tensorflow as tf

c4 = tf.constant([[5,3],[4,6]])
v4 = tf.Variable([[1,4],[7,9]])
cond1 = tf.Variable([[True,False],[False,False]])
cond2 = tf.Variable([[True,True],[False,True]])
c5 = tf.constant([[True , True], [False, False]])
v5 = tf.Variable([[False, True], [True , False]])

session = tf.Session()
session.run(tf.initialize_all_variables())

print("====== WHERE ======") # select -> where
print(session.run(tf.where(cond1, c4, v4))) # [[5 4] [7 9]]
print(session.run(tf.where(cond2, c4, v4))) # [[5 3] [7 6]]
print(session.run(tf.where(c5))) # [[0 0] [0 1]]

print("====== LOGICAL ======")
print(session.run(tf.logical_and(c5,v5))) # [[False True] [False False]]
print(session.run(tf.logical_or(c5,v5))) # [[True True] [True False]]
print(session.run(tf.logical_xor(c5,v5))) # [[True False] [True False]]
print(session.run(tf.logical_not(c5))) # [[False False] [True True]]

session.close()
```

![]({{ site.baseurl }}/assets/posts/tensorflow/tensorflow_logicalOperation_result.png)
