---
title: "react-datepicker 커스텀 해서 사용하기 with TypeScript"
description: "년도와 월을 선택할 수 있는 Select, 오늘 날짜로 변경 및 닫기 버튼 추가"
date: "2023-04-12"
---

캘린더에서 날짜를 선택할 수 있도록 해주는 DatePicker를 사용해야 하는데<br>
기존에 사용하던 jQuery DatePicker 대신 `react-datepicker` 라이브러리를 사용하고자 한다.<br>

[react-datepicker 공식 사이트](https://reactdatepicker.com/)

### 설치

```
npm install -D react-datepicker
npm install -D @types/react-datepicker // typescript가 아니라면 생략
npm install -D date-fns // locale 설정에서 사용
```

`react-datepicker`의 기본 디자인에서 추가 해야할 커스텀 항목은 3가지 정도이다.<br>

1. 년도와 월을 각각 선택할 수 있는 Select element
2. 오늘 날짜로 변경해주는 '오늘' 버튼
3. 캘린더를 닫아주는 '닫기' 버튼

`react-datepicker`를 제대로 사용하기 위해선 css 파일도 import 해주어야 한다.
커스텀 디자인 같은 경우 추가로 css 파일을 만들어서 변경을 원하는 클래스만 수정하고 import 해주었다.

```js
# _app.tsx
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/custom-datepicker.css'; // 커스텀 디자인 css 파일
```

컴포넌트로 빼서 사용하도록 했는데 대략적 구조와 사용한 DatePicker 옵션은 다음과 같다.

```js
import { forwardRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale'; // 언어 설정을 위한 locale import

export const CustomDatePicker() => {
	const [startDate, setStartDate] = useState(today); // 날짜 선택을 위한 state
	const ref = useRef<DatePicker>(null); // 캘린더 close를 위한 ref
	const CustomInput = forwardRef(({ value, onClick }, ref) => ( Custom Input ));

	<DatePicker
		ref={ref}
		locale={ko} // 언어 설정
		selected={startDate} // 선택된 날짜
		dateFormat="yyyy-MM-dd" // 날짜를 '2023-04-12'와 같이 표시
		todayButton="오늘" // 날짜를 오늘로 변경하는 버튼의 이름 설정
		onChange={(date) => setStartDate(date)} // 날짜 선택 시 상태 변경
		customInput={<CustomInput />} // Custom Input
		renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (...)} // Custom Header
	/>
	{ 닫기 버튼이 들어갈 곳 }
	</DatePicker>
}
```

### Custom Input

선택된 날짜가 보여질 곳을 커스텀 할 수 있다.<br>
설정하지 않으면 기본적으로 input 태그가 사용되는데 button으로 변경할 수도 있고, input에 원하는 옵션을 추가할 수도 있다.<br>
기본 input은 키보드 입력으로 수정이 가능하기 때문에 readOnly 옵션을 추가해줄 것이다.<br>
readOnly 옵션을 추가해주면 캘린더로만 날짜를 변경할 수 있다.

```js
const CustomInput = forwardRef(({ value, onClick }, ref) => (
	<input onClick={onClick} ref={ref} defaultValue={value} readOnly />
))
```

### Custom Header

년도와 월을 변경해서 한 번에 해당 년, 월의 캘린더로 이동할 수 있도록 커스텀 하려고 한다.

```js

const today = new Date();
const years = Array.from(Array(11), (_, i) => getYear(today) - 10 + i); // 오늘부터 10년 전까지의 년도 [2013, 2014, ...]
const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

<DatePicker
    // 생략
	renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
		<div>
			<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{' < '}</button> // 이전 월로 이동
			<select
				value={date.getFullYear()}
				onChange={({ target: { value } }) => changeYear(value)}
			>
			{years.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
			</select>
			<select
				value={months[date.getMonth()]}
				// months 배열에서 인덱스로 값을 가져오는데 date.getMonth()는 0부터(1월) 시작하므로 months에는 '1월'부터 값을 넣어야 한다.
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			>
			{months.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
			</select>
			<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{' > '}</button> // 다음 월로 이동
		</div>
	>
	</DatePicker>
)}
```

### 닫기 버튼 추가

오늘로 변경하는 버튼은 DatePicker에 `todayButton` 옵션을 넘겨주면 간단하게 추가 가능하지만<br>
캘린더를 수동으로 닫을 수 있는 버튼은 따로 없는 듯하다.<br>
캘린더를 닫기 위해 useRef()로 제어해줄 것이다.<br>
캘린더 하단에 위치하는 버튼으로 만들어주려면 `<DatePicker></DatePicker>` 태그 사이에 추가 해주어야 한다.<br>

```js
<DatePicker
	ref={ref}
	// 생략
>
	<div>
		<button onClick={() => ref.current.setOpen(false)}>닫기</button>
	</div>
</DatePicker>
```

ref를 추가한 후에 아무리 버튼을 눌러도 캘린더가 사라지지 않아서 뭔가 잘못되었다 싶었는데<br>
검색 해보니 `<DatePicker>` 컴포넌트를 `<label>` 태그로 감싸면 동작하지 않는다고 한다.<br>
컴포넌트를 호출하는 부분에서 `<label>` 태그를 사용하고 있었고, 제거해주니 정상 동작했다..!<br>
[참고 링크](https://github.com/Hacker0x01/react-datepicker/issues/1012)

### 결과

커스텀 디자인까지 적용한 모습이다. <br>
윈도우 녹화는 select option이 안보여서 중간에 년도와 월을 선택하는 과정이 생략되었다.

<img src="/posts/custom-react-datepicker/custom-datepicker.gif" width="500px"/>
