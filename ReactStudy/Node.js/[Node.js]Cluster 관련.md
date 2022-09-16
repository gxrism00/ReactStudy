# **Cluster**

> `cluster`는 쉽게 멀티프로세스를 생성해주는 모듈입니다.
>
> `worker`라고 하는 자식프로세스를 만들고 자식프로세스를 감독

## child_process 와 cluster

> 사실 cluster는 내부적으로 child_process를 이용 함  
>
> cluster.fork는 최종적으로 child_process.fork를 호출
>
> 한가지, 중요한 특징으로 cluster는 `같은 포트를 공유`

## 예제

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

- 자식프로세스는 `프로그램의 맨 처음부터 다시실행 됨`

## [출처]  
https://nodejs.org/api/cluster.html의 글을 바탕으로 작성  
https://velog.io/@dev2820/nodejs%EC%9D%98-Cluster