---
layout: post
title: ! "[TensorFlow] TensorFlow 배열 다루기"
categories: [TensorFlow]
excerpt: " "
comments: true
share: true
tags:
  - TensorFlow
  - array

---

### 상수 및 세션 생성
```py
import tensorflow as tf

c1 = tf.constant([1, 2, 3, 4, 5, 0, 9, 8 ,7 ,6])
c2 = tf.constant([1, 2, 3])
c3 = tf.constant([1, 3, 5])
c4 = tf.constant([[1, 3, 5], [5, 7, 9]])
v1 = tf.constant([[6, 5, 4, 3, 2, 1],[0, 1, 2, 9, 8, 7]])
v2 = tf.constant([[6, 5, 4], [0, 1, 2]])
v3 = tf.constant([2, 4, 6])
v4 = tf.constant([[2, 4, 6], [6, 8, 0]])

session = tf.Session()
session.run(tf.global_variables_initializer())
```

### Slicing 
```py
print("====== Slicing ======")
print(session.run(tf.slice(c1,[2],[3]))) # [3 4 5]
print(session.run(tf.slice(v1, [0, 2], [2, 2]))) # [[4 3] [2 9]]
print(session.run(tf.slice(v1, [0, 2], [2, -1]))) # [[4 3 2 1] [2 9 8 7]]
```

### Tile
```py
print("\n====== Tile ======") # 한 텐서를 여러번 반복해 새로운 텐서를 만듦
print(session.run(tf.tile(c2, [3]))) # [1 2 3 1 2 3 1 2 3]
print(session.run(tf.tile(v2, [2,2])))
# [[6 5 4 6 5 4] [0 1 2 0 1 2] [6 5 4 6 5 4] [0 1 2 0 1 2]]
```

### Pad
```py
print("\n====== Pad ======") # 2차원 배열에서만 동작
print(session.run(tf.pad(v2, [[1,1], [2,2]], "CONSTANT")))
# [[0 0 0 0 0 0 0] [0 0 6 5 4 0 0] [0 0 0 1 2 0 0] [0 0 0 0 0 0 0]]
print(session.run(tf.pad(v2, [[1,1], [2,2]], "REFLECT"))) # 반복
# [[2 1 0 1 2 1 0] [4 5 6 5 4 5 6] [2 1 0 1 2 1 0] [4 5 6 5 4 5 6]]
print(session.run(tf.pad(v2, [[1,1], [2,2]], "SYMMETRIC"))) # 가운데 대칭
# [[5 6 6 5 4 4 5] [5 6 6 5 4 4 5] [1 0 0 1 2 2 1] [1 0 0 1 2 2 1]]
```

### Stack & Unstack
```py
print("\n====== Stack ======") # pack -> stack 차원 증가
print(session.run(tf.stack([c3, v3]))) # [[1 3 5] [2 4 6]]
print(session.run(tf.stack([c4, v4]))) # [[[1 3 5] [5 7 9]]  [[2 4 6] [6 8 0]]]

print("\n====== Unstack ======") # unpack -> unstack 차원 감소
s1 = tf.stack([c3,v3]) # [[1, 3, 5] [2 4 6]]
s2 = tf.stack([c4,v4]) # [[[1 3 5] [5 7 9]] [[2 4 6] [6 8 0]]
print(session.run(tf.unstack(s1))) # [[1, 3, 5] [2, 4 ,6]]
print(session.run(tf.unstack(s2))) # [[[1, 3, 5], [5, 7, 9]], [[2, 4, 6], [6, 8, 0]]]
```

### Reverse
```py
print("\n====== Reverse ======")
print(session.run(tf.reverse(v1, [True, False]))) # [[7 8 9 2 1 0] [1 2 3 4 5 6]]
```

### Transpose
```py
print("\n====== Transpose ======")
print(session.run(tf.transpose(c3))) # [1 3 5]
print(session.run(tf.transpose(c4, perm=[0,1]))) # [[1 3 5] [5 7 9]]
```

### Gather
```py
print("\n====== Gather ======")
print(session.run(tf.gather(c1, [2, 5, 2, 5]))) # [3 0 3 0]
print(session.run(tf.gather(v1, [[0,0], [1,1]])))
# [[[6 5 4 3 2 1] [6 5 4 3 2 1]] [[0 1 2 9 8 7] [0 1 2 9 8 7]]]
```

### one_hot
```py
print("\n====== one_hot ======")
print(session.run(tf.one_hot([1,2,3,4],2)))
# [[0. 1.] [0. 0.] [0. 0.] [0. 0.]]
print(session.run(tf.one_hot([2,-1,1],3)))
# [[0. 0. 1.] [0. 0. 0.] [0. 1. 0.]]
```

