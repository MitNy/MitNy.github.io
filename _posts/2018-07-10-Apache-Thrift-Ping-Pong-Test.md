---
layout: post
title: ! "[Apache Thrift] Ping Pong Test"
categories: [Apache Thrift]
excerpt: " "
comments: true
share: true
tags:
  - Apache Thrift
  - Ubuntu
  - ping pong
---

### 환경: Ubuntu 16.04 LTS
### thrift version : 0.11.0

1.ping_pong thrift 파일을 작성한다.

```
namespace py ping_pong

service ping_pong
{
  string ping ()
}
```

`thrift --gen py ping_pong.thrift` 를 해주면 gen-py 디렉토리가 생성되고, 그 안에 파일들도 생겨난다.

![]({{ site.baseurl }}/assets/posts/apache-thrift/ping_genpy.png)

**thrift --gen error 시**
ImportError: No module named Thrift 이런식으로 thrift 관련 모듈이 없다고 뜬다면
thrift 설치 폴더/thrift-0.11.0/lib/py 에 들어가서
`sudo python setup.py install` 을 해줍니다.
![]({{ site.baseurl }}/assets/posts/apache-thrift/py_setup.png)

설치 완료 후 다시 gen을 했을 때 `No Module named six`이 뜬다면 
`sudo apt-get install python-six` 또는 `sudo pip install six`를 해주면 된다.
설치가 완료되었다면 다시 gen.

gen-py 디렉토리 안에 ping과 pong을 보낼client.py와 server.py를 작성한다.

**Client.py**
```py
import time
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from thrift.Thrift import TException

import ping_pong.ping_pong

socket = TSocket.TSocket('192.168.0.53', 9090)
transport = TTransport.TBufferedTransport(socket)
protocol = TBinaryProtocol.TBinaryProtocol(transport)
client = ping_pong.ping_pong.Client(protocol)

while(1):
    try:
        transport.open()
        print ">> ping to server"
        print client.ping()
        transport.close()
        time.sleep(1)
    except TException, tx:
        print "%s" % (tx.message)
```

**Server.py**
```py
import sys
# thrift 0.11.0
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from thrift.Thrift import TException

import ping_pong.ping_pong



class ping_pong_server(ping_pong.ping_pong.Processor):
    def __init__(self, my_address, my_port):
        self.my_address = my_address
        self.my_port = my_port

    def startServer(self):
        processor = ping_pong.ping_pong.Processor(self)
        transport = TSocket.TServerSocket(host=self.my_address, port=self.my_port)
        tfactory = TTransport.TBufferedTransportFactory()
        pfactory = TBinaryProtocol.TBinaryProtocolFactory()

        server = TServer.TThreadedServer(processor, transport, tfactory, pfactory)

        print 'Starting the server...'
        server.serve()
        print 'done.'


    def ping(self):
        print "<< ping from client"
	print ">> pong to client"
        return "<< pong from server"

ping_pong_server('192.168.0.53', 9090).startServer();
```

localhost로 하려고 했으나 VM 두개를 돌려 아예 client와 server를 분리시켰다.

server측 VM의inet addr로 소켓 통신을 할 것이다.
server측에서 9090포트를 열고, client는192.168.0.53:9090에 접근 요청을 한다.
client측에서는 ping을 보내고 server에서 받은 값을 출력한다.
server측엥서는 client에서 보낸 ping을 받고 pong을 return 해준다.

출력은 다음과 같다.
![]({{ site.baseurl }}/assets/posts/apache-thrift/ping_client.png)
![]({{ site.baseurl }}/assets/posts/apache-thrift/ping_server.png)

