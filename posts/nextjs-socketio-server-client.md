---
title: 'Socket.io로 client와 server 간 데이터 주고 받기 with Next.js, TypeScript'
description: ''
date: '2023-05-12'
---

Socket.io를 사용하는 예제 중 대표적인게 채팅이지만 client 간 채팅 보다는 좀 더 간단한 목적으로 사용하고자 했고<br>
client에서 데이터를 보내면 그 데이터로 server에서 특정 처리 후 성공, 에러 등의 메시지를 다시 client로 보내주는 기능이 필요했다.<br>


### 설치

```
npm install -D express
npm install -D socket.io
npm install -D socket.io-client
npm install -D @types/express
npm install -D @types/socket.io
```

TypeScript를 사용중이라 타입들도 같이 설치를 해줬다.<br>

### Server

프로젝트 루트에 server.ts를 추가해준다.

```js
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    // option (CORS 에러 발생할 경우 추가)
    cors: {
        origin: 'client 주소',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    // client가 연결되면 연결된 socket id 콘솔에 출력
    console.log(`User Connected: ${socket.id}`);

    // client로부터 'to server' 이벤트를 받으면 socket id와 함께 client가 보낸 메시지 콘솔에 출력
    socket.on('to server', (message) => {
        console.log(`${socket.id}: ${message}`);

        // client에게 통신 성공 메시지를 보내줌
        socket.emit('to client', 'Communication Success.');
    });
});

// 8000번 포트 사용
http.listen(8000);
```

필수적인 이벤트만 추가해주고 `node server.ts` 로 서버를 실행시켜 준다.

### Client

client에서 `socket.io-client`를 통해 socket을 사용할 수 있다.

```js
const { io } from 'socket.io-client';
const { useState, useEffect } from 'react';

const Page = () => {
    const [message, setMessage] = useState('');

    // server.ts 설정해준 포트를 사용한다.
    const socket = io('server:8000');

    useEffect(() => {
        // server로부터 'to client' 이벤트의 메시지가 전송되면 콘솔에 메시지 출력
        socket.on('to client', (message: string) => {
            console.log(message);
        });
    }, [message]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 사용자가 입력한 메시지를 'to server' 이벤트로 server에 전송
        socket.emit('to server', message);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="message" value={message} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Page;
```

<br><br>
### 결과

<img src="/posts/nextjs-socketio-server-client/client.png" width="500px" />

```bash
User Connected: fawYXNTKIyV-72QnAAAX
fawYXNTKIyV-72QnAAAX: Hello~
```

client에서 `Hello~`를 입력 후 Submit 버튼을 누르면<br>
server 단 콘솔엔 연결된 socket id와 client가 보낸 'Hello~'가 출력되고,<br>
server가 보낸 `Communication Success.` 메시지가 client의 콘솔에 출력된다.