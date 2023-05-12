---
title: 'react-hook-form과 useRef 같이 쓰기'
description: ''
date: '2023-05-12'
---

꼭 state를 사용해야하는 곳이 아니면 `react-hook-form`으로 폼을 사용하고 있었는데<br>
useRef로 폼에 스타일을 적용하거나 포커싱 해줘야 하는 일이 생겼다.<br>

overwritten 에러, getValues()에 값이 없는 에러.. 를 겪은 후 사용하는 방법을 정리해본다.<br>

### register와 ref의 순서

만약 아래와 같이 ref를 먼저 지정해주고 register를 사용할 경우<br>
`'ref' is specified more than once, so this usage will be overwritten.` 에러를 볼 수 있다.<br>
register 자체적으로 ref를 가지고 있기 때문에 먼저 ref를 지정해주면 덮어써지는 것이다.<br>

```js
const inputRef = useRef(null);

<input
    ref={inputRef}
    {...register('id')}
/>
```

순서만 바꿔주면 에러는 사라지지만 제대로 사용할 수 없다.

### register의 ref를 useRef와 연결

```js
const inputRef = useRef(null);

<input
    {...register('id')}
    ref={inputRef}
/>
```

위 에러를 해결하기 위해 register와 ref의 순서는 바꿔줬지만 문제가 하나 생겼다.<br>
getValues()로 폼 데이터를 가져와도 id의 값은 `undefined`였다.<br>
문제는 ref가 변경되었는데 register는 그걸 모르고 있다는 것이다. 그래서 값을 아무리 변경해도 업데이트가 되지 않았다.<br>

```js
const inputRef = useRef(null);

<input
    {...register('id')}
    ref={(e) => {
        register('id').ref(e);
        inputRef.current = e;
    }}
/>
```

이렇게 register('id')의 ref를 변경해주면 되고,<br>
`register('id').ref = e;`가 아님을 명심해야 한다.<br>

값도 잘 바뀌고 useRef로 DOM 접근도 잘 되는 것을 확인했다 :3