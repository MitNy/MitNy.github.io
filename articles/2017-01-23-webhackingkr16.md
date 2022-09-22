---
layout: post
title: ! "[Webhacking.kr] 16"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/16.png)

16번엔 별이 세 개있다.
코드는 다음과 같다.

```html
document.body.innerHTML+="<font color=yellow id=aa style=position:relative;left:0;top:0>*</font>";

function mv(cd)
{
kk(star.style.posLeft-50,star.style.posTop-50);
if(cd==100) star.style.posLeft=star.style.posLeft+50;
if(cd==97) star.style.posLeft=star.style.posLeft-50;
if(cd==119) star.style.posTop=star.style.posTop-50;
if(cd==115) star.style.posTop=star.style.posTop+50;
if(cd==124) location.href=String.fromCharCode(cd);
}


function kk(x,y)
{
rndc=Math.floor(Math.random()*9000000);
document.body.innerHTML+="<font color=#"+rndc+" id=aa style=position:relative;left:"+x+";top:"+y+" onmouseover=this.innerHTML=''>*</font>";
}
```

if문에 있는 숫자들을 아스키 코드로 변환하면 각각 d,a,w,s,| 이다.
- 100(d)
- 97(a)
- 119(w)
- 115(s)
- 124(`|`)

인터넷 익스플로러로 daws를 누르면 별이 움직인다.
|를 누르면 페이지가 이동되고 password가 뜬다.
![](/assets/posts/webhackingkr/16_password.png)

Auth에 입력해주면 클리어


