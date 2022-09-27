---
title: '체크박스 상태 관리 및 전체 선택/해제 구현하기 with React, Typescript'
description: 'Array와 Set 두 가지 버전으로 구현해보기'
date: '2022-09-27'
---

## Array로 구현하기

1. 이벤트 핸들러
```js
// 1: 체크박스의 id만 숫자로 담을 거여서 number[] 타입으로 배열을 만들어주었다.
const [checkedList, setCheckedList] = useState<number[]>([]);

// 2: 전체 체크/해제 handler
const handleAllCheck = (e) => {
	// 전체 체크/해제용 체크박스가 체크되었을 때
	if (e.target.checked) {
		let items:number[] = [];

		// 한 페이지에서 보여지고 있는 데이터를 전부 items 배열에 넣어주고 setCheckedList
		// data = [{ id: 1, name: 'test'}, { id: 2, name: 'checkbox'}, { id: 3, name: 'mitny' }]
		Object.entries(data).map((item, i) => {
			items[i] = item[1].id;
		});

		setCheckedList(items);
	} else {
		// 전체 체크/해제용 체크박스가 해제되었을 때 배열 초기화
		setCheckedList([]);
	}
}

// 3: 개별 선택/해제 handler
const handleSingleCheck = (e) => {
	// 각 행의 체크박스가 체크되었을 때 checkedList 배열에 현재 행의 체크박스 id를 추가한다.
	if (e.target.checked) {
		setCheckedList([...checkedList, Number(e.target.id)]);
	} else {
		// 각 행의 체크박스가 해제되었을 때 checkedList 배열에서 현재 행의 체크박스 id를 제거한다.
		setCheckedList(checkedList.filter(id => id != Number(e.target.id)));
	}
}
```

핸들러 부분에서는 체크박스를 체크/해제하는 이벤트가 발생했을 때 배열에 추가/삭제(또는 초기화)하는 방식으로 구현했다.<br>
체크박스가 있는 테이블에서는 아래와 같이 핸들러를 호출했다.

2. 이벤트 핸들러 호출
```js {8-10, 22-23}
<table>
	<colgroup>
		<col width="38px"/><col width="*"/>
	</colgroup>
	<thead>
		<tr>
			<th>
				// 전체 체크/해제 체크박스, 변경될 때 handleAllCheck가 호출된다.
				// checked 여부를 확인하기 위해 이벤트 객체를 넘겨준다.
				<input type="checkbox" onChange={(e) => handleAllCheck(e)}/>
			</th>
			<th>이름</th>
		</tr>
	</thead>
	<tbody>
		{ data && Object.entries(data).map((item, id) => (
		<tr key={id}>
			<td>
				<input
					type="checkbox"
					id={item[1].id}
					onChange={(e) => handleSingleCheck(e)} // 각 행의 체크박스, 변경될 때 handleSingleCheck가 호출된다.
					checked={checkedList.includes(item[1].id)} // checkedList에 현재 행의 id가 존재하면 checked=true
				/>
				</td>
			<td>{item[1].name}</td>
		</tr>
		))}
	</tbody>
</table>
```


지금은 각 행의 고유한 값인 id로 처리하고 있어서 중복 처리가 필요하지 않았지만<br>
따로 중복 처리를 하는 과정을 생략하고 싶어서 Set으로 구현하는 것도 시도해보았다.<br>

Set으로 구현하면서 어려웠던 점은 클릭했을 때 정상적으로 checkedList의 상태는 변하지만 화면에서는 체크 표시가 되지 않는 것이었다.<br>
검색해보니 단순히 `checkedList.add(1)`를 할 경우 변화가 생겨도 다시 렌더링이 되지 않는다고 한다.<br>
실제로도 페이지를 새로 고침하지 않고 다른 부분의 코드를 수정하여 새로 렌더링이 됐을 때는 체크 표시가 되었다.<br>

새로 Set을 만들어서 상태를 변경해주는 방식으로 해결했다.

## Set으로 구현하기

1. 이벤트 핸들러
```js
// 1: number 타입의 Set 생성, 이후 새로 Set을 생성할 때도 number 타입으로 생성해야 한다.
const [checkedList, setCheckedList] = useState(new Set<number>());

// 2: 전체 체크/해제 handler
const handleAllCheck = (e) => {
	if (e.target.checked) {
		Object.entries(data).map((item, i) => {
			// checkedList를 전체 id를 추가한 새로운 Set으로 만들어주고 setCheckedList
			setCheckedList(checkedList => new Set<number>(checkedList.add(Number(item[1].id))));
		});
	} else {
		// 전체 체크/해제용 체크박스가 해제되었을 때 새로운 Set 생성해서 초기화
		setCheckedList(new Set<number>());
	}
}

// 3: 개별 선택/해제 handler
const handleSingleCheck = (e) => {
	// 체크되면 checkedList에 id 추가, 해제되면 filter로 id 제거
	if (e.target.checked) {
		setCheckedList(checkedList => new Set<number>(checkedList.add(Number(e.target.id))));
	} else {
		setCheckedList(checkedList => new Set<number>([...checkedList].filter(id => id !== Number(e.target.id))));
	}
}
```

Array 구현 방식과 다른 점은 객체를 새로 만들어준다는 것이고 전체적인 로직은 비슷하다.

2. 이벤트 핸들러 호출
```js {23}
<table>
	<colgroup>
		<col width="38px"/><col width="*"/>
	</colgroup>
	<thead>
		<tr>
			<th>
				// 전체 체크/해제 체크박스, 변경될 때 handleAllCheck가 호출된다.
				// checked 여부를 확인하기 위해 이벤트 객체를 넘겨준다.
				<input type="checkbox" onChange={(e) => handleAllCheck(e)}/>
			</th>
			<th>이름</th>
		</tr>
	</thead>
	<tbody>
		{ data && Object.entries(data).map((item, id) => (
		<tr key={id}>
			<td>
				<input
					type="checkbox"
					id={item[1].id}
					onChange={(e) => handleSingleCheck(e)} // 각 행의 체크박스, 변경될 때 handleSingleCheck가 호출된다.
					checked={checkedList.has(item[1].id)} // checkedList에 현재 행의 id가 존재하면 checked=true
				/>
				</td>
			<td>{item[1].name}</td>
		</tr>
		))}
	</tbody>
</table>
```

이벤트 핸들러 호출에서 바뀐 점은 checked 처리뿐이다.<br>
`checkedList.includes() -> checkedList.has()`


## 결과
<img src="/posts/react-ts-array-set-checkbox/checkbox-exam.gif" width="500px"/>
