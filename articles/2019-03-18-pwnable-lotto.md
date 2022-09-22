---
layout: post
title: ! "[Pwnable.kr] lotto"
categories: [Pwnable.kr]
excerpt: " "
comments: true
share: true
tags:
  - pwnable.kr
  - write-up
---

![](/assets/posts/pwnkr/lotto.png)

lotto - 2pt
코드가 좀 길어서 어려워보일 수도 있지만 일부분만 봐도 풀 수 있다.

```c
unsigned char submit[6];

void play(){

        int i;
        printf("Submit your 6 lotto bytes : ");
        fflush(stdout);

        int r;
        r = read(0, submit, 6);

        printf("Lotto Start!\n");
        //sleep(1);

        // generate lotto numbers
        int fd = open("/dev/urandom", O_RDONLY);
        if(fd==-1){
                printf("error. tell admin\n");
                exit(-1);
        }
        unsigned char lotto[6];
        if(read(fd, lotto, 6) != 6){
                printf("error2. tell admin\n");
                exit(-1);
        }
        for(i=0; i<6; i++){
                lotto[i] = (lotto[i] % 45) + 1;         // 1 ~ 45
        }
        close(fd);

        // calculate lotto score
        int match = 0, j = 0;
        for(i=0; i<6; i++){
                for(j=0; j<6; j++){
                        if(lotto[i] == submit[j]){
                                match++;
                        }
                }
        }

        // win!
        if(match == 6){
                system("/bin/cat flag");
        }
        else{
                printf("bad luck...\n");
        }

}

```

- 유저로부터 6 bytes를 읽어들이고 6개의 랜덤 값을 1~45까지의 수로 만들어 lotto 배열에 저장한다.
- submit 배열이 char 타입이기 때문에 1~45까지의 수를 ASCII 코드표를 참고해 입력해야 한다.
- 이중 for문으로 총 36번을 도는데 lotto 배열에 있는 랜덤 값과 유저 입력값 중 한 개라도 일치하면 match가 증가한다.

![](/assets/posts/pwnkr/asciicode.png)

나는 &(38)를 이용해 6자리를 입력해봤다.

![](/assets/posts/pwnkr/lotto_flag.png)

두 번만에 플래그가 떴다!

`sorry mom... I FORGOT to check duplicate numbers... :(`

