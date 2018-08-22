---
layout: post
title: ! "[CTF] Beginners Quest"
categories: [CTF]
excerpt: " "
comments: true
share: true
tags:
  - ctf
  - google
  - beginners Quest
---

![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners.png)

Google CTF에`Beginners Quest`라는 난이도가 낮은 문제들로 구성된 코너가 있다.

1. LETTER (misc)

![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners_letter.png)

Attchment를 누르면 zip파일이 다운 받아지고, 그 안에는 `challenge.pdf` 파일이 있다.
파일을 열어보면 Username과 Password가 까맣게 가려져있다.

![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners_letter_pdf.png)

Username과 Password 부분을 복사하고 메모장 같은 곳에 붙여넣기를 하면

`Username:........................... ● Password:CTF{ICanReadDis}`

이런식으로 플래그가 뜬다 :)


2. OCR IS COOL!

![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners_ocr.png)

Attchment를 누르면 zip 파일이 다운 받아지고 그 안에 `OCR_is_cool.png` 파일이 있다.
이 png파일을 열어보면, 누군가에게 메일이 온 것을 캡쳐한 화면이다.

![]({{ site.baseurl }}/assets/posts/ctf/google/OCR_is_cool.png)

문제 설명을 보니 Caesar라는 단어가 있어서 시저암호에 대한 문제인가 라는 생각을 했는데
사진을 보고나서 정확해졌다.

사진 하단을 자세히 보면 CTF{...} 형식처럼 보이는 문장이 보인다.
![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners_ocr_enc.png)

`VMY{vtxltkvbiaxkbltlnulmbmnmbhgvbiaxk}`

위 문자열을 시저 암호 복호화 코드를 이용해 복호화 해줄 것이다.

### 복호화 코드
출처:[https://bpsecblog.wordpress.com/2016/08/03/amalmot_2/](https://bpsecblog.wordpress.com/2016/08/03/amalmot_2/)
```py
import string
 
def shift(c, N):
    if c not in string.ascii_lowercase:
        return c
    if ord(c)+N > ord("z"):
        return chr( ord(c)+N - 26 )
    else:
        return chr( ord(c)+N )
 
def solve(chip):
    for i in range(1,26):
        mes = ''
        for c in chip:
            mes += shift(c,i)
        print "key("+str(i)+") : "+mes
 
if __name__ == '__main__':
    chip = raw_input('> ').lower()
    solve(chip)
```

결과는 다음과 같다.

![]({{ site.baseurl }}/assets/posts/ctf/google/ctf_google_beginners_ocr_dec.png)

여기서 ctf만 대문자로 바꿔주면 된다.

`CTF{caesarcipherisasubstitutioncipher}`
