---
layout: post
title: ! "[Evlz CTF 2019] ManyFiles"
excerpt_separator: " "
tags:
  - CTF
  - write-up
---

`Evlz CTF`에 출제된 150 points 웹 문제이다.
[Link](http://13.232.233.247/scannie/)

![]({{ site.baseurl }}/assets/posts/ctf/Evlz/scannie.png)

문제 링크로 들어가면 입력창과 Scan 버튼, 파일 목록들이 보인다.
문자열을 입력한 후 Scan 버튼을 누르면 `Invalid Rule`이라는 메시지가 뜬다.

![]({{ site.baseurl }}/assets/posts/ctf/Evlz/code.png)

코드를 보면 `Swagger Conformant API` 부분이 주석처리 되어 있고, api와 관련된 코드들이 있다는 것을 알 수 있다.
* Swagger: Rest API로 개발 시 문서를 자동으로 만들어주는 프레임워크
API_URL인 `http://13.232.233.247:1338`에서 `/api/listdir`에 접근하면
다음과 같이 파일 목록을 볼 수 있다.
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/lists.png)

`/api/scan`은 에러 메시지 같은 게 뜬다.
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/scan.png)

Swagger 관련 문서를 읽어보면 `/api/spec`에 접근해 API 스펙을 볼 수 있다고 한다.
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/spec.png)

여기서 새롭게 알게 된 사실은
1. flask-restful-swagger API를 사용한다.
2. /api/readfile에 접근할 수 있다.
3. Yara Rule을 사용해 SCAN_DIRECTORY에서 파일을 스캔한다.
정도가 있다.

그냥 `/api/readfile`에 접근하면 에러 메시지가 나온다.

Yara Rule은 처음 들어보는 것이라 검색해봤더니
`문자열이나 바이너리 패턴을 기반으로 미리 정의된 시그니처로 악성코드를 분류할 수 있게 해주는 도구`라고 한다.

Yara Rule이 기본적으로 갖추어야 할 형태는 다음과 같다.
```
rule silent_banker : banker
{
    meta:
	description = “This is just an example”
	thread_level = 3
	in_the_wild = true
     strings:
	$a = {6A 40 68 00 30 00 00 6A 14 8D 91}
	$b = {8D 4D B0 2B C1 83 C0 27 99 6A 4E 59 F7 F9}
	$c = “UVODFRYSIHLNWPEJXQZAKCBGMT”
    condition:
	$a or $b or $c
}
```
자세한 룰은 [https://yara.readthedocs.io/en/v3.5.0/writingrules.html](https://yara.readthedocs.io/en/v3.5.0/writingrules.html)에서 볼 수 있다.

Yara를 사용하여 검사하고자 하는 파일이 condition에 TRUE일 경우 규칙이 맞음을 출력하고 False라면 기본적으로는 출력하지 않는다.
위의 Rule을 간단하게 해석해보면 문자열 또는 바이너리 패턴이 `6A 40 68 00 30 00 00 6A 14 8D 91` 또는 `8D 4D B0 2B C1 83 C0 27 99 6A 4E 59 F7 F9` 또는 `UVODFRYSIHLNWPEJXQZAKCBGMT` 와 일치하면 TRUE인 것이다.

그렇다면 이 룰을 사용해 플래그를 뽑아낼 수 있을 것이다.

```
rule silent_banker : banker
{
    meta:
        description = “This is just an example”
        thread_level = 3
        in_the_wild = true
     strings:
        $a = "evlz"
        $b = "flag"
    condition:
        $a or $b
}
```

Evlz CTF의 플래그 형식인 'evlz' 혹시나 모를 'flag'를 조건으로 주는 것이다.

![]({{ site.baseurl }}/assets/posts/ctf/Evlz/rule.png)
Burp Suite로 Scan 버튼을 눌렀을 때를 보면 /api/scan으로 rule을 POST해주는 걸 알 수 있다.
이 부분에 위에서 약간 수정한 룰을 입력해준다. 보낼 때는 base64로 인코딩 해줘야 한다. (Ctrl+B)
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/rule_burp.png)
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/rule_base64.png)

그럼 다음과 같이 Directory Listing 밑에 Match List가 뜨는 걸 볼 수 있다. 
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/match.png)

파일 목록엔 없는 568.c 이 떴다.
위에서 에러 메시지가 뜬다고 언급했던`/api/readfile`에서 file을 요청해보겠다.
rule과 마찬가지로 base64인코딩을 해서 보내주어야 한다.
그리고 proxy 탭에서 forward를 하게 되면 아무 것도 뜨지 않아서 Repeater를 사용했다.
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/repeater.png)

굉장히 수상해보이는 data가 떴다.
지금까지 데이터를 base64로 인코딩해서 보내주었으니 저 data를 base64로 디코딩 해본다.
![]({{ site.baseurl }}/assets/posts/ctf/Evlz/decode.png)

플래그 :)
`evlz{yara_rules_are_great}ctf`
