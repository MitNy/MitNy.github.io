---
layout: post
title: ! "[FreeACS] FreeACS sbt로 build 하기"
categories: [FreeACS]
excerpt: " "
comments: true
share: true
tags:
  - FreeACS
  - Ubuntu
  - sbt
  - build
---

## How to install FreeACS on Ubuntu 16.04
### 환경 : Ubuntu 16.04 LTS

[FreeACS 설치](https://mitny.github.io/articles/2018-07/Ubuntu-FreeACS-install)

FreeACS가sbt로 빌드하는 것으로 바뀌었다고 한다.
freeacs github에서는 `sbt clean compile test` 로 빌드하라고 했으나
본 포스팅에선 `sbt clean compile stage`로 빌드할 것이다.
with 엄청난 삽질..ㅎㅎ

우선 sbt를 설치해야 한다.
참고: https://www.scala-sbt.org/1.0/docs/Installing-sbt-on-Linux.html

```
echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823
sudo apt-get update
sudo apt-get install sbt
```

삽질을 엄청나게 했던 이유가 installation에는 빌드에 필요한 파일들이 하나도 포함되어있지 않기 때문이다...
정말 에러의 연속이었다!!
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_stage.png)
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_error.png)
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_error2.png)\

제일 많이 본 에러는 Not a valid command: stage 였다
Stackoverflow를 아무리 찾아봐도 답변으로 해결되지 않았다.
그래서 해결방법을 모색하다가 freeacs github에 들어가봤다.

![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_build.sbt.png)
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_project.png)

가져와야 할 것은 build.sbt,Dependencies.scala,plugins.sbt 이다.
build.properties는 sbt 버전만 확인해주면 된다.
build.sbt는 `/installation/ubuntu/`에 Dependencies.scala,plugins.sbt,build.properties는 `/installation/ubuntu/project/`에 위치하면 된다.

위 파일을들 올바르게 디렉토리에 넣었다면 다시 `sbt clean compile stage`를 해준다.

![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_warning.png)
에러만 보다가 빌드가 성공되니 너무나도 기뻤으나
warning이 굉장히 많았다. main class가 존재하지 않아서 script파일이 생성되지 않았다고 한다.

![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_warning.png)
tr069,web 등등 디렉토리는 정상적으로 생성되었다.

하지만 필요로 하는 bin 디렉토리가 존재하지 않았다.
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_lib.png)

다시 구글링을 해보니 main class가 필요하다고 한다!
[참고](https://stackoverflow.com/questions/36251873/sbt-not-generating-bin-directory-when-staging-or-publishing-docker-other-quest)

그래서 다음과 같이 tr069,web,webservice,shell,syslog,stun,core에 `mainClass in (Compile) := Some("~~~")`을 추가해주었다.
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_web.png)

다시 빌드를 하면 warning 없이 빌드가 끝난 것을 볼 수 있다.
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_done.png)

bin 디렉토리도 잘 생성되었다.
![]({{ site.baseurl }}/assets/posts/freeacs/freeacs_bin.png)



빌드 끝!
