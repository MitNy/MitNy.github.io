---
title: "setInterval의 타입은..? with TypeScript"
description: ""
date: "2023-02-02"
---

setInterval을 이용해서 새로고침 기능을 추가하던 중 useState의 타입을 지정해줘야 했는데<br>
그냥 `Timer`를 사용할 경우 `Cannot find name 'Timer'.` 에러가 떴다.<br>

알아보니 NodeJS 환경에서 타이머 함수 사용 시 setInterval은 `NodeJS.Timer` 타입을,<br>
브라우저 환경에서는 `number` 타입을 반환하기 때문에 두 가지 방법으로 지정해줄 수 있다.

1. NodeJS.Timer

```js
const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timer>();
...
# setInterval 그대로 사용한다.
setRefreshInterval(setInterval(() => console.log('refresh'), 5000));
```

2. number

```js
const [refreshInterval, setRefreshInterval] = useState<number>();
...
# window.setInterval을 사용한다.
setRefreshInterval(window.setInterval(() => console.log('refresh'), 5000));
```
