---
layout: post
title: ! "[Pwnable.kr] collision"
categories: [Pwnable.kr]
excerpt: " "
comments: true
share: true
tags:
  - Pwnable.kr
  - collision
---

![]({{ site.baseurl }}/assets/posts/pwnkr/collision.png)

pwnable.kr 의 두번째 문제 col은 **Daddy told me about cool MD5 hash collision today. I wanna do something like that too!**

```
col@ubuntu:~$ ls -l

total 16

-r-sr-x--- 1 col_pwn col     7341 Jun 11  2014 col

-rw-r--r-- 1 root    root     555 Jun 12  2014 col.c

-r--r----- 1 col_pwn col_pwn   52 Jun 11  2014 flag

```

fd 문제와 마찬가지로 실행가능한 파일, 읽기 가능한 파일, flag 파일이 있다.
우선 col 파일을 실행시켜보면 ./col [passcode] 이런식으로 입력하라고 알려준다.

```
col@ubuntu:~$ ./col 123
passcode length should be 20 bytes
col@ubuntu:~$ ./col 11111111111111111111
wrong passcode.
```

col 파일의 코드를 보자.

```c
#include <stdio.h>
#include <string.h>

unsigned long hashcode = 0x21DD09EC;
unsigned long check_password(const char* p){
        int* ip = (int*)p;
        int i;
        int res=0;
        for(i=0; i<5; i++){
                res += ip[i];
        }
        return res;
}

int main(int argc, char* argv[]){
        if(argc<2){
                printf("usage : %s [passcode]\n", argv[0]);
                return 0;
        }
        if(strlen(argv[1]) != 20){
                printf("passcode length should be 20 bytes\n");
                return 0;
        }
        if(hashcode == check_password( argv[1] )){
                system("/bin/cat flag");
                return 0;
        }
        else
                printf("wrong passcode.\n");
        return 0;
}
```

인자가 2보다 적을때 처음실행시켰을 때처럼 usage : ./col [passcode] 라는 메시지가 뜨고 종료된다.
또, strlen 함수를 통해 argv[1]의 길이가 20 과 일치하지 않으면 passcode length should be 20 bytes 라는 메시지를 출력하고 종료한다.

hashcode가 argv[1] 값을 check_password에 집어넣었을 때 리턴되는 값과 일치할 때,flag 파일이 실행된다.

```
unsigned long hashcode = 0x21DD09EC;
unsigned long check_password(const char* p){
        int* ip = (int*)p;
        int i;
        int res=0;
        for(i=0; i<5; i++){
                res += ip[i];
        }
        return res;
}
```

이 부분을 보면 포인터 변수 ip는 check_password로 넘어온 argv[1] 값이 되고,
for 문을 통해 ip를 4바이트씩 나눠 5번 res에 더한다.
결과적으로 res가 0x21DD09EC 이 되야 한다.
0x21DD09EC 를 5번 나누면 0x6C5CEC8 이 되고, 
0x21DD09EC - ( 0x6C5CEC8 * 5 ) = 4 가 된다.
4바이트가 남기 때문에 0x6C5CEC8 * 4 + 0x6C5CECC( 0x6C5CEC8 + 4byte ) 를 입력해줘야 한다.

python을 사용해 입력할건데, 리틀엔디안이므로 거꾸로 입력해줘야 한다.

col@ubuntu:~$ ./col `python -c 'print "\xc8\xce\xc5\x06"*4+"\xcc\xce\xc5\x06"'`

![]({{ site.baseurl }}/assets/posts/pwnkr/collision_flag.png)

daddy! I just managed to create a hash collision :)
