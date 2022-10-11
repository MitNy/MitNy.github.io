---
title: 'react-i18next로 다국어 처리하기 with Next.js, TypeScript'
description: 'react-i18next로 다국어 리소스를 적용해보자'
date: '2022-09-23'
---

처음 Next.js에서 다국어 처리를 해줄 때는 `next-i18next`를 사용했었는데<br>
SSR로 구현하다보니 __NEXT_DATA__에 리소스가 노출되는 문제가 있어서 클라이언트단에서 번역 처리가 되도록 `react-i18next`를 사용하기로 했다.<br>
next-i18next를 CSR에서도 사용할 수 있다거나 리소스를 노출시키지 않고 사용할 수 있는 방법을 찾게 되면 그 때 다시 next-i18next를 사용해보겠다..


### 설치
```bash
npm install i18next @types/i18next react-i18next @types/react-i18next
```

### 리소스 디렉토리 생성
현재 프로젝트 디렉토리 구조는 이런 식으로 되어있다.<br>
컴포넌트, 페이지 같은 것들은 src의 하위 디렉토리로 관리하고 있는데<br>
리소스 디렉토리는 public에 만들지 않고 src/locales로 만들어주겠다.

```bash
.
├── next.config.js
├── next-env.d.ts
├── next-i18next.config.js
├── node_modules
├── package.json
├── public
├── src
│   ├── components
│   ├── pages
│   └── styles
└── tsconfig.json
```

### src/locales
src/locales에서는 각 언어별로 따로 디렉토리를 만들어주고, i18next 설정 파일인 i18n.ts를 만들어 줄 것이다.<br>

```bash
.
├── locales
│   ├── i18n.ts
│   ├── en
│   │   └── common.json
│   ├── ja
│   │   └── common.json
│   └── ko
│       └── common.json
```

### i18n.ts
```js
import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "./ko/common.json";
import en from "./en/common.json";
import ja from "./ja/common.json";

const resources:Resource = {
  ko: { common: ko },
  en: { common: en },
  ja: { common: ja }
}

i18n.use(initReactI18next).init({
	resources, // 리소스
	ns: "common", // namespace 설정
	lng: "ko", // 초기 설정 언어
	fallbackLng: "ko",
	interpolation: {
		escapeValue: false
	},
	react: {
		useSuspense: false
	}
});

export default i18n;
```

언어별 리소스 파일을 import 해서 resources 객체에 넣어준 후 i18next를 초기화한다.<br>
리소스 파일은 아래와 같이 각 메뉴별로 key를 나눠놨는데 비구조화 할당 시 각 key를 namespace로 인식하는 것 같았다.

```json
// ko/common.json
{
	"menu": {
		"logout": "로그아웃",
		...
	},
	"config": {
		...
	}
	...
}
```
`t('key1.key2')`가 아닌 `t('key1:key2')`로 접근해야 리소스가 제대로 불러와졌다.<br>
그래서 resources 객체 생성은 비구조화 할당이 아닌 지금의 코드로 변경하게 되었다.

```js
// ko에 비구조화 할당했을 때
const resources:Resource = {
  ko: { ...ko },
  en: { ...en },
  ja: { ...ja }
}

// console.log(resources);
{
	ko: { menu: { logout: '로그아웃', ... }, ... },
	en: ...
}
```

```js
// ko.common에 바로 넣어줬을 때
const resources:Resource = {
  ko: { common: ko },
  en: { common: en },
  ja: { common: ja }
}

// console.log(resources);
{
	ko: { common: { menu: [Object] } },
	en: ...
}
```


i18next의 기본 namespace 값은 translation인데 리소스 파일명과 맞추기 위해 `ns: "common"` 설정도 해줬다.<br>
fallbackLng는 만약 en으로 언어 설정을 바꾸려고 했는데 어떤 리소스 키가 en에 없을 경우 대신 값을 가져올 언어를 설정하는 것이다.<br>
자세한 설정은 [이 곳](https://www.i18next.com/overview/configuration-options)에..

설정이 끝났다면 이제 i18n을 import 해서 사용하면 된다.<br>
우선 프로젝트 전체에서 사용할 리소스여서 `_app.tsx`에 i18n을 import 해주었다.

```js
import "../locales/i18n";
...

function App({ ... }) {
	return (
		...
	)
}

export default MyApp
```

이후에는 직접 리소스를 사용할 곳에서 `useTranslation`을 import 하고 사용하면 된다.

```js
// src/pages/ex.tsx

...
import { useTranslation } from "react-i18next";

export default function Example() {
	const { t } = useTranslation();

	return (
		<div>{t('menu.logout')}</div>
	)
}

```

