---
title: 'Next.js 13 마이그레이션 기록'
description: '12.2.5 to 13.0.6'
date: '2022-12-08'
---

진행중인 프로젝트는 Next.js 12.2.5 버전으로 개발중이었는데 Next.js 13이 나왔다는 소식을 들었다..!<br>
`getStaticProps`나 `getServerSideProps`를 사용하지 않고 `use` 하나로 Data Fetching이 가능하다는 점이 매력적이라 버전을 올리기로 했다.<br>
버전은 계속 올라갈테니 조금이라도 빨리 마이그레이션을 해서 적응하는게 좋을 것 같기도 했다.<br>
app/ 디렉토리에서 Layout, Loading, Error 페이지 등을 관리할 수 있다는 점도 좋았으나,<br>
아직 베타 버전이고 Production에 적용하는 것을 권장하지 않아서 우선 기존에 사용하던 pages/는 유지하기로 했다.<br>

<br>
12.x 버전에서 13 버전으로 마이그레이션 하면서 겪은 에러나 변경점을 기록하고자 한다.

### 1. useRouter

12 버전에서는 `next/router`를 사용해서 라우팅을 했으나<br>
13 버전에서는 `next/navigation`를 사용해야 한다고 한다.<br>
[참고 링크](https://stackoverflow.com/questions/71961539/router-push-is-not-working-as-expected-nextjs)

```
[12.x]
import { useRouter } from "next/router";

[13.x]
import { useRouter } from 'next/navigation';
```

<br>

### 2. Link

`<Link>` 내부의 `<a>` 태그를 제거해야 한다.<br>
`<a>` 태그가 존재하면 이런 에러가 뜬다.

```bash
Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
```

`<a>` 태그에서 onClick 등을 사용했다면 그대로 `<Link>`에 옮겨주면 된다.<br>
codemods로 자동으로 변경해주는게 있다는대 수작업으로 변경한 뒤에 알게되었다...^^<br>
[codemods#new-link](https://beta.nextjs.org/docs/upgrade-guide/codemods#new-link)

```
[12.x]
<Link href='/test'>
    <a onClick={(e) => click(e)}>
        Click
    </a>
</Link>

[13.x]
<Link href='/test' onClick={(e) => click(e)}>
    Click
</Link>
```


### 작업중...
