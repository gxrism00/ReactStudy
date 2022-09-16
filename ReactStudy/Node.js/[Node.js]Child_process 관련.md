# **Child_process**

> `nodejs는 싱글스레드` 이벤트 루프를 가짐. 그래서 2가지 방식으로 자식프로세스를 생성 함

- `비동기` : 자식프로세스가 비동기적으로 동작해 이벤트 루프를 `block하지 않음`

- `동기` : 자식프로세스가 동기적으로 동작해 자식프로세스가 종료 또는 종료당하기까지 이벤트 루프를 `block 함`

## **spawn**

> `spawn`으로 생성된 자식프로세스에서 ls -lh /usr를 수행한 결과가 이벤트로 발생하고 stdout,stderr에서 각각 이벤트를 대기했다 출력하는 코드

### 예제

```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
```

> `child_process.spawn` 함수로 생성한 자식프로세스는 `비동기`적으로 작동합니다.
>  
> 만약 `동기적`으로 작동하는 자식프로세스가 필요하다면 `child_process.spawnSync`를 사용해야 함
>  
> nodejs에선 `자식프로세스의 생성`은 `기본적으로 spawn`을 통해 이루어지고, `exec`,`fork`등의 `편의 함수`도 내부적으론 spawn을 사용
>  
> 부모프로세스가 자식프로세스의 종료를 기다리지 않고 종료하게 만들기 위해선 자식프로세스에서 `unref()`함수를 사용 함(`subprocess.unref()`)

### 명세

```javascript
child_process.spawn(command[,args][,options])
```

- `command`: string,실행할 명령입니다.
- `args`: string[], argument 배열입니다.
- `options`: object, 옵션이 들어있는 객체입니다.

## **exec**

### 예제

```javascript
const { exec } = require('child_process');

exec('"/path/to/test file/test.sh" arg1 arg2');
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('echo "The \\$HOME variable is $HOME"');
// The $HOME variable is escaped in the first instance, but not in the second.
```

### 명세

```javascript
child_process.exec(command[, options][, callback])
```

- `command`: string, 실행할 명령입니다.
- `options`: Object, exec에 설정할 옵션들이 들어있는 객체입니다.
- `callback`: exec로 생성된 자식프로세스가 종료되면 실행할 callback함수입니다. (error,stdout,stderr)를 파라미터로 갖습니다.

## **execFile**

> execFile은 exec와 거의 유사, 차이점은 default로 `shell을 실행하지 않는다`는 점

### 예제

 ```javascript
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
 ```

### 명세

```javascript
child_process.execFile(file[, args][, options][, callback])
```

- `file`: string, 실행할 파일 이름입니다.
- `args`: string[], 전달할 arguments 배열입니다.
- `options`: Object, execFile에 설정할 옵션들이 들어있는 객체입니다.
- `callback`: execFile로 생성된 자식프로세스가 종료되면 실행할 callback함수입니다. (error,stdout,stderr)를 파라미터로 갖습니다.

## **fork**

> 다른 exec, spawn과 달리 nodejs 프로세스를 생성할 때 사용하며 `부모프로세스와 IPC 채널이 자동으로 생성`
>  
> option설정 없이 process.send, process.on('message',callback)을 사용할 수 있습니다.

### 예제

```javascript
if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const { fork } = require('child_process');
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(__filename, ['child'], { signal });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
  controller.abort(); // Stops the child process
}
```

### 명세

```javascript
child_process.fork(modulePath[, args][, options])
```

- `modulePath`: string, 자식프로세스로 실행할 모듈경로 입니다.
- `args`: string[], arguments 배열입니다.
- `options`: 옵션이 들어있는 객체

## [출처]  
Node.js v16.4.2 documentation - child process의 글을 바탕으로 작성  
https://velog.io/@dev2820/nodejs%EC%9D%98-%EC%9E%90%EC%8B%9D%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4