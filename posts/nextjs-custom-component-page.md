---
title: "Next.js Component와 NextPage에 커스텀 속성 추가하기 with TypeScript"
description: ""
date: "2023-09-05"
---

각 페이지에 특정 속성 값을 부여하고 속성 값에 따라 다른 동작을 하도록 하고 싶다.<br>
예를 들어 `useLayout` 이라는 속성이 있을 때 `useLayout = true`일 때는 레이아웃이 컴포넌트를 감싸는 형태로 보여주고<br>
`useLayout = false`일 때는 컴포넌트만 보여주도록 하고싶다.<br> 하지만 단순히 `Page.useLayout = true;` 이렇게 추가해주면 타입 에러가 난다..<br>

우선 app 구조는 다음과 같다.<br>

### \_app.tsx

```js {3}
function App({ Component, pageProps }: AppProps) {
	return (
		{Component.useLayout ? (
			<Layout>
				<Component {...pageProps} />
			</Layout>
		) : (
			<Component {...pageProps} />
		)}
	);
}

```

에러가 나는 부분은 `Component.useLayout`인데 AppProps의 Component에 `useLayout` 속성이 존재하지 않아서 그렇다.<br>

```
Property 'useLayout' does not exist on type 'FunctionComponent<{}> & { getInitialProps?(context: NextPageContext): {} | Promise<{}>; }'
```

해결하기 위해선 interface를 확장시켜 사용해주면 된다.

```js
interface CustomAppProps extends Omit<AppProps, 'Component'> {
	Component: AppProps['Component'] & { useLayout: boolean };
}

function App({ Component, pageProps }: CustomAppProps) {
	...
}

```

app에서 에러를 해결했으니 이제 페이지별로 useLayout 속성을 추가해줘야 하는데 역시나 여기서도 쉽게 되지 않는다..ㅎㅎ<br>
레이아웃과 함께 보여주고 싶은 NextPage 타입의 Page 상수가 있다고 해보자<br>

### page.tsx

```js {7}
const Page: NextPage = () => {
	...
}

export default Page;

Page.useLayout = true;
```

이 때 마지막 라인에서 이런 에러가 난다.<br>

```
Property 'useLayout' does not exist on type 'FunctionComponent<{}> & { getInitialProps?(context: NextPageContext): {} | Promise<{}>; }'
```

당연하게도 NextPage에 `useLayout` 속성이 존재하지 않기 때문이다..<br>
그렇다면 AppProps와 마찬가지로 NextPage 타입도 확장시켜주면 되는데<br>
NextPage의 경우 props를 넘겨받기도 하고, props에 타입을 지정해줘야 하는 경우가 있기 때문에 살짝 헤맸다.<br>

```js
type NextPageWithLayout<P = {}> = NextPage<P> & {
	useLayout: boolean;
};

const Page: NextPageWithLayout = () => {
	...
}

export default Page;

Page.useLayout = true;
```

`NextPage` 타입에 커스텀 속성 `useLayout`이 추가된 `NextPageWithLayout`을 Page의 타입으로 지정해주면 된다.<br>
이 때 props가 필요하지 않은 페이지도 있으니 `NextPageWithLayout<P = {}>`와 같이 빈 값을 기본값으로 넣어주고<br>
props의 타입이 있는 경우엔 그대로 넘겨받을 수 있도록 `NextPage<P>`를 사용한다.<br>

<br>
<br>
커스텀 끝...!
