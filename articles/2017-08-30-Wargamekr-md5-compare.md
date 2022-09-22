---
layout: post
title: ! "[Wargame.kr] md5_compare"
categories: [Wargame]
excerpt: " "
comments: true
share: true
tags:
  - Wargame.kr
  - Web-hacking
  - write-up
---
![](/assets/posts/wargamekr/wargamekr.png)

![](/assets/posts/wargamekr/md_compare.png)

md5_compare 는 VALUE1 과 VALUE2 를 비교해서 같으면 된다.
코드를 보면 다음과 같다.

```php
<?php
    if (isset($_GET['view-source'])) {
         show_source(__FILE__);
         exit();
    }

    if (isset($_GET['v1']) && isset($_GET['v2'])) {
        sleep(3); // anti brute force

        $chk = true;
        $v1 = $_GET['v1'];
        $v2 = $_GET['v2'];

        if (!ctype_alpha($v1)) {$chk = false;}
        if (!is_numeric($v2) ) {$chk = false;}
        if (md5($v1) != md5($v2)) {$chk = false;}

        if ($chk){
            include("../lib.php");
            echo "Congratulations! FLAG is : ".auth_code("md5_compare");
        } else {
            echo "Wrong...";
        }
    }
?>
```

v1는 알파벳이어야 하고, v2는 숫자여야 한다.
그리고 그 둘을 md5화 했을 때, 다르면 false, 같으면 chk를 해서 flag를 출력한다.

PHP는 int형과 char형을 구분하여 선언하지 않는다고 한다.
md5 해싱을 할 때 해쉬값이 `0e****` 인 경우 두 값을 비교하면 무조건 참이 된다.

![](/assets/posts/wargamekr/md_compare_stack.png)

stack overflow의 위 답변을 참고하여
VALUE1에는 QNKCDZO를, VALUE2에는 240610708을 넣어봤더니 문제가 풀렸다.

![](/assets/posts/wargamekr/md_compare_clear.png)
