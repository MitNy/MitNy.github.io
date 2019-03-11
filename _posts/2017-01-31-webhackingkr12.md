---
layout: post
title: ! "[Webhacking.kr] 12"
categories: [Webhacking.kr]
excerpt: " "
comments: true
share: true
tags:
  - Web-hacking
  - webhacking.kr
  - write-up
---

![]({{ site.baseurl }}/assets/posts/webhackingkr/12.png)

12번 문제를 보면 자바스크립트 관련 문제인 듯하다.
페이지 소스를 보면 스크립트 부분이 이렇게 되어있다.

```
WorkTimeFun=String.fromCharCode(118,97,114,32,101,110,99,111 … … );
eval(WorkTimeFun);
```

숫자 부분은 아스키 코드인 것 같아 하나하나 노가다로 변환해보니
```
v a r SP e n c o = '' ;
CR LF v a r SP e n c o 2 = 1 2 6 ;
CR LF v a r SP e n c o 3 = 3 3 ;
CR LF v a r SP e n c o k = d o c u m e n t . U R L . s u b s t r ( d 
```

하다가 포기...

다른 방법을 찾아보다가 12번 페이지 주소창에 javascript:alert(WorkTimeFun) 을 쳐보니 아래와 같은 창이 떴다.

![]({{ site.baseurl }}/assets/posts/webhackingkr/12_alert1.png)
![]({{ site.baseurl }}/assets/posts/webhackingkr/12_alert2.png)

### 전체코드
```js
var enco = '';
var enco2 = 126;
var enco3 = 33;
var ck = document.URL.substr( document.URL.indexOf('=') ); 

for (i = 1; i < 122; i++) { 
	enco = enco + String.fromCharCode(i, 0);
}
function enco_(x) {
	return enco.charCodeAt(x);
}

 if (ck == "=" + String.fromCharCode(enco_(240))
+ String.fromCharCode(enco_(220)) 
+ String.fromCharCode(enco_(232))
+ String.fromCharCode(enco_(192))
+ String.fromCharCode(enco_(226))
+ String.fromCharCode(enco_(200))
+ String.fromCharCode(enco_(204))
+ String.fromCharCode(enco_(222 - 2))
+ String.fromCharCode(enco_(198))
+ "~~~~~~"
+ String.fromCharCode(enco2)
+ String.fromCharCode(enco3))

{ 
	alert("Password is " + ck.replace("=", "")); 
}
```

eval 로 위 소스를 실행 시키고, ck와 같을 때 password를 출력시키는 것 같다.
(##eval : 문자열을 자바스크립트 코드로 변환시켜주는 함수)

```
"="+String.fromCharCode(enco_(240))+String.fromCharCode(enco_(220))+String.fromCharCode(enco_(232))+String.fromCharCode(enco_(192))+String.fromCharCode(enco_(226))+String.fromCharCode(enco_(200))+String.fromCharCode(enco_(204))+String.fromCharCode(enco_(222-2))+String.fromCharCode(enco_(198))+"~~~~~~"+String.fromCharCode(enco2)+String.fromCharCode(enco3)
```

위 소스를 콘솔 창에 입력해주면 답이 나온다.
인증하면 끝!
