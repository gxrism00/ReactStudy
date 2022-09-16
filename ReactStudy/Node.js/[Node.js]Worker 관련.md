# **Worker**

> 목표 : I/O 작업이 아닌 CPU 집약적인 작업의 퍼포먼스 향상
>
> I/O는 비동기적 작업이 더 효율적이다.

## 기본 사용법

```javascript
const { worker, parentPort } = require('worker_threads')
// worker는 독립적인 실행스레드 의미, parentPort는 메세지 포트의 인스턴스 

new Worker(filename) 이나 new Worker(code, {eval: true})
// 워커를 시작하는 2가지 메인 방법

worker.on('message'), worker.postMessage(data)
// 다른 스레드간 메세지를 주고 받을 때 사용

parentPort.on('message'), parentPort.postMessage(data)
// 부모 자식 스레드간 메시지를 주고 받음
```

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');
 
if (isMainThread) { //메인 스레드
  // isMainThread : 현재 코드가 메에니 스레드인지 아니지 구분
  const worker = new Worker(__filename); // 같은 dir폴더에 워커를 생성
    
} else { // 워커스레드
  // 위에서 생성한 worker는 여기서 동작
}
```

## 메인스레드 <-> Worker 데이터 송수신

- `worker.postMessage(data)`로 부모에서 워커로 데이터를 보내고
- `parentPort.on('message')`로 부모로부터 데이터를 받고, `parentPort.postMessage(data)`로 데이터를 보낸다.

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');
 
if (isMainThread) { // 메인 스레드
   const worker = new Worker(__filename);
 
   worker.on('message', (value) => {
      console.log('워커로부터', value)
   })
   worker.on('exit', (value) => { // parentPort.close()가 일어나면 이벤트 발생
      console.log('워커 끝~');
   })
 
   worker.postMessage('ping'); // 워커스레드에게 메세지를 보낸다.
 
} else { // 워커스레드
 
   parentPort.on('message', (value) => {
      console.log("부모로부터", value);
      parentPort.postMessage('pong');
      parentPort.close(); // 워커스레드 종료라고 메인스레드에 알려줘야 exit이벤트 발생
   })
}
```

> **모듈로 관리 가능**

```javascript
//main.js
const { Worker } = require('worker_threads');

   const worker = new Worker(./worker.js);
 
   worker.on('message', (value) => {
      console.log('워커로부터', value)
   })
   worker.on('exit', (value) => { // parentPort.close()가 일어나면 이벤트 발생
      console.log('워커 끝~');
   })
 
   worker.postMessage('ping'); // 워커스레드에게 메세지를 보낸다.
```

```javascript
//worker.js
const { parentPort } = require('worker_threads')
   parentPort.on('message', (value) => {
      console.log("부모로부터", value);
      parentPort.postMessage('pong');
      parentPort.close(); // 워커스레드 종료라고 메인스레드에 알려줘야 exit이벤트 발생
   })
}
```

## Worker 간 데이터 송수신

> MessageChannel을 사용

```javascript
// main.js
const {Worker, MessageChannel} = require('worker_threads')
 
const {port1, port2} = new MessageChannel()
 
const worker1 = new Worker('./worker1.js')
const worker2 = new Worker('./worker2.js')
 
worker1.postMessage({worker2: port1}, [port1])
worker2.postMessage({worker1: port2}, [port2])
```

```javascript
// worker1.js
const assert = require('assert') // 값을 비교하여 프로그램이 제대로 동작하는지 테스트 하는데 사용하는 모듈
const {parentPort, MessagePort} = require('worker_threads')
 
parentPort.once('message', ({worker2}) => {
  assert(worker2 instanceof MessagePort)
  worker2.postMessage('message from worker1')
})
```

```javascript
// worker2.js
const assert = require('assert'); 
const {parentPort, MessagePort} = require('worker_threads')
 
parentPort.once('message', ({worker1}) => {
  assert(worker1 instanceof MessagePort)
  worker1.on('message', message => {
    console.log('worker2 received message: %o', message)
  })
})
```

> 워커의 핵심은 무언가 하드한 코드가 있으면,
>
> 이를 개발자가 이 코드를 잘 쪼개서 나뉘어 할당하는 로직을 구현하여 나누는 능력이 필요하고, 워커에서 돌리고 나온 결과나 설정 등등 하나하나 개발자가 세세하게 직접 코딩해야 한다는 특징이 있습니다.
>
> 즉, 구현이 어렵다.

<br/>

## 워커를 이용해서 하드한 작업을 분배

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
 
let
   min = 2,
   max = 10_000_000,
   primes = [];
 
// 아리토스테네스의 체 소수구하기
function generatePrimes(start, range) {
   let isPrime = true;
   const end = start + range;
   for (let i = start; i < end; i++) {
      for (let j = min; j < Math.sqrt(end); j++) {
         if (i !== j && i % j === 0) {
            isPrime = false;
            break;
         }
      }
       if (isPrime) {
         primes.push(i)
      }
      isPrime = true;
   }
}
 
 
if (isMainThread) {
   const threadCount = 8;
   const threads = new Set()
   const range = Math.ceil((max - min) / threadCount); // 10_000_000 max를 8개의 쓰레드에 분배를 해서 처리하기 위해서
 
   let start = min;
   console.time('prime2');
 
   // 우리가 워커가 일을 할수있게 분배하고 직접 짜야 한다. 여간 복잡한게 아니다..
   for (let i = 0; i < threadCount - 1; i++) {
      const wStart = start;
      threads.add(new Worker(__filename, { workerData: { start: wStart, range: range } }))
      start += range;
   }
   // 7개만 for돌고 마지막 워커는 특별해서 따로 지정
   threads.add(new Worker(__filename, { workerData: { start: start, range: range + ((max - min + 1) % threadCount) } }));
 
   // 워커들 이벤트 등록
   for (let worker of threads) {
 
      worker.on('error', (err) => {
         throw err;
      })
 
      worker.on('exit', () => {
 
         threads.delete(worker);
 
         if (threads.size ===0){
            console.timeEnd('prime2')
            console.log(primes.length);
         }
      });
 
      // 워커들이 일한 결과를 메시지 받아서 정리해주는 동작도 직접 구현
      worker.on('message', (msg) => {
         primes = primes.concat(msg);
      })
   }
 
} else {
   // 워커들 일 등록
   generatePrimes(workerData.start, workerData.range);
   parentPort.postMessage(primes);
}
```

## Child_process(자세한 내용은 다른 md 참고)

```javascript
const { exec } = require('child_process');
 
var process = exec('dir'); // 마치 우리가 터미널에서 dir를 치는 거와 같은 역할을 한다.
 
// 결과물 출력은 반드시 우리가 직접 구현해줘야 한다.
process.stdout.on('data', function (data) { 
    console.log(data.toString());
});
 
// 에러 났을 경우
process.stderr.on('data', function (data) {
    console.error(data.toString());
});
```

## Cluster (자세한 내용은 다른 md 참고)

- `워커 쓰레드`는 쓰레드를 여러개 만드는 거라면, (cpu작업을 분담)
- `클러스터`는 프로세스를 여러개 만드는 것. (서버를 주로 여러개 실행)

```javascript
const cluster = require('cluster');
const http = require('http');
// os.cpus() : CPU의 정보를 담은 객체. CPU의 세부 정보를 반환
// 코어가 몇개인지. 8코어 16스레드 -> 16코어로 침
const numCPUs = require('os').cpus().length;
 
// 워커쓰레드의 isMainThread와 비슷한 로직이다.
if (cluster.isMaster) {
   console.log(`마스터 프로세스 아이디: ${process.pid}`);
 
   // CPU 개수만큼
   for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork(); // 워커 프로세스를 생산
   }
 
   // 워커가 종료되었을 때
   cluster.on('exit', (worker, code, signal) => {
      console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
      console.log('code', code, 'signal', signal);
      // cluster.fork(); // 워커가 종료되었을때 하나 더 만들어주면 다시 서버 켜주게 된다.
   });
} else {
   // 워커 프로세스 부분
   // 워커들이 포트에서 대기
   http
      .createServer((req, res) => {
         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
         res.write('<h1>Hello Node!</h1>');
         res.end('<p>Hello Cluster!</p>');
         setTimeout(() => {
            // 워커 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
         }, 1000);
      })
      .listen(8086);
 
   console.log(`${process.pid}번 워커 실행`);
}
```

## [출처]

https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-workerthreads-%EB%AA%A8%EB%93%88#top
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-childprocess-%EB%AA%A8%EB%93%88
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-cluster-%EB%AA%A8%EB%93%88-%EC%BD%94%EC%96%B4%EB%A5%BC-%EC%B6%94%EA%B0%80%EB%A1%9C-%EC%82%AC%EC%9A%A9