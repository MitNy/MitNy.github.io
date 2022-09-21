---
title: 'amCharts4 적용하기 with Next.js'
description: '기존에 PHP와 Javascript ES5로 사용하고 있던 amCharts4를 Next.js에서 사용 해보기'
date: '2022-09-21'
---

<img src="/posts/nextjs-amcharts4/amcharts-light-opaque.png" width="500px" />

[amcharts4](https://www.amcharts.com/docs/v4/)
<br>지도, 그래프 등 다양한 시각화 기능을 제공한다.<br>
현재는 라이선스를 구매해서 사용하고 있는데, 라이선스가 없는 경우 워터마크가 화면에 표시된다.


기존에는 이렇게 js 파일을 추가해서 사용했는데

```js
<script src="/js/amcharts4/core.js"></script>
<script src="/js/amcharts4/maps.js"></script>
<script src="/js/amcharts4/charts.js"></script>
...
```

Next.js에서 사용하려면 npm 또는 yarn으로 설치해주면 된다.
```bash
npm install @amcharts/amcharts4

yarn add @amcharts/amcharts4
```

설치 후 사용하려는 곳에서 import를 해주면 된다.
```js
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
```

<br><br>

## run... 그리고 error

import 후 차트가 보이길 기대하면서 npm run을 했는데... 에러가 떴다

```bash
error - ~~/node_modules/@amcharts/amcharts4/core.js:8
export { System, system } from "./.internal/core/System";
^^^^^^

SyntaxError: Unexpected token 'export'
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1055:15)
    at Module._compile (node:internal/modules/cjs/loader:1090:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Module.require (node:internal/modules/cjs/loader:1028:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.@amcharts/amcharts4/core (~~~/.next/server/pages/index.js:62:18)
    at __webpack_require__ (~~~/.next/server/webpack-runtime.js:33:42) {
  page: '/'
}
```

amCharts 모듈을 포함해서 transpile 하기 위해 `next-transpile-modules`를 설치해줘야 한다.

```bash
npm install next-transpile-modules
```

설치 후 next.config.js도 수정해야 한다.
```js
const withTM = require("next-transpile-modules")(["@amcharts/amcharts4"]);

module.exports = withTM({
// any other general next.js settings
// EX
  reactStrictMode: false,
  webpack: (config, { isServer, node }) => {
    node = {
      ...
    };
    return config;
  }
})
```

기존에 사용하던 config 내용들은 withTM 안에 작성해주면 된다.


## Pie Chart 예제 추가 해보기

```js
// components/Charts.ts
import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default function PieChart() {
	useEffect(() => {
		let chart = am4core.create("chartdiv", am4charts.PieChart);
		
		// Add data
		chart.data = [
			{
				"country": "Lithuania",
				"litres": 501.9
			}, {
				"country": "Czech Republic",
				"litres": 301.9
			}, {
				"country": "Ireland",
				"litres": 201.1
			}, {
				"country": "Germany",
				"litres": 165.8
			}, {
				"country": "Australia",
				"litres": 139.9
			}, {
				"country": "Austria",
				"litres": 128.3
			}, {
				"country": "UK",
				"litres": 99
			}, {
				"country": "Belgium",
				"litres": 60
			}, {
				"country": "The Netherlands",
				"litres": 50
			}
		];

		// Add and configure Series
		let pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		/**
 	    * Destroying map on leave page.
 	    */
	    return () => {
			chart.dispose();
		};
	}, []);

	return (
		<div
			id="chartdiv"
			style={{
				width: "60%",
				height: "300px"
			}}
		/>
	);
}
```

```js
// pages/chart.tsx

...
import PieChart from "../components/Charts";

export default const Chart = () => {
	return (
		<>
			<PieChart />
		</>
	)
}
```

## Pie Chart 예제 결과

<img src="/posts/nextjs-amcharts4/amcharts4-pie-sample.png" width="500px"/>
