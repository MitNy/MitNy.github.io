---
layout: post
title: ! "[Pwnable.kr] shellshock"
categories: [Pwnable.kr]
excerpt: " "
comments: true
share: true
tags:
  - Pwnable.kr
---

![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock.png)

1pt짜리 문제로 `ShellShock bash shell 취약점(cve-2014-6271)`과 관련된 문제이다.
해당 취약점은 bash shell에서 임의의 환경변수에 특정 코드를 삽입하여 실행할 수 있는 취약점이다.
![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_ls.png)

4가지 파일이 있고 shellshock.c 코드는 다음과 같다.

```c
#include <stdio.h>
int main(){
	setresuid(getegid(), getegid(), getegid());
	setresgid(getegid(), getegid(), getegid());
	system("/home/shellshock/bash -c 'echo shock_me'");
	return 0;
}
```

![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_export.png)
환경 변수에 변수와 함수를 정의할 수 있는데, 위와 같은 경우엔 t가 함수가 아니기 때문에 t가 실행되지 않는다.

환경 변수에 함수를 정의하는 방법은
`t() { echo test; }; export -f t` 이런식이다.

함수를 정의하면 실행 가능하다.
![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_func.png)

Shellshock의 경우 함수처럼 보이는 변수(`() {`) 로 시작하는 변수를 정의한 후
bash subshell을 열면 bash가 시작되면서 환경 변수를 읽어온다.

![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_bash.png)

환경변수에 정의한 변수를 그냥 printenv 했을 때와 bash를 실행한 후 printenv 했을 때 다르게 출력되는 것을 확인할 수 있다.

이 때 t를 실행하면 test가 출력된다.

![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_permission.png)
이를 활용해 /bin/cat으로 flag를 읽으려고 하면 권한 때문에 읽을 수 없다.
하지만 shellshock에는 setuid가 걸려 있고 안에서 bash를 실행시키기 때문에
flag를 읽는 환경변수를 추가해준 후 shellshock를 실행하면  bash가 초기화 되면서 함수가 실행된다.

![]({{ site.baseurl }}/assets/posts/pwnkr/shellshock_flag.png)


`only if I knew CVE-2014-6271 ten years ago..!!`
플래그 !!

