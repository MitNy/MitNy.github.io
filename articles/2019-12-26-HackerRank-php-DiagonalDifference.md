---
layout: post
title: ! "[HackerRank] Diagonal Difference (PHP)"
categories: [HackerRank]
excerpt: " "
comments: true
share: true
tags:
  - HackerRank
  - PHP
  - Algorithm
---

n개의 행과 열을 가지는 정사각형 2차원 배열이 주어지면 대각선 원소들을 더한 후 두 값의 차를 절대값으로 출력하는 문제

### Input
```
$n = 3
$arr = 
11 2 4
4 5 6
10 8 -12
```

### Output
```
15
```

### Code
```php
<?php
function diagonalDifference($n, $arr) {
    $array_rk = 0;
    $array_tp = 0;
    for( $i=0; $i<$n; $i++ ) {
		$array_rk += $arr[$i][$i];
		$array_tp += $arr[$i][$n-1-$i];
    }
    return abs($array_rk-$array_tp);
}
?>

```

