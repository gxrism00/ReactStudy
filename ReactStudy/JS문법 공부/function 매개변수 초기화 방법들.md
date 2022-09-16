# [function 매개변수 초기화 방법들]

- 1번째 방법  
  
```javascript
fuction Hello(name){
    let NewName = name || "friend";
    let msg = `Hello, ${NewName}` 
    console.log(msg)
}

Hello();  //Hello, friend
Hello("world!"); //Hello, world!
``` 

- 2번째 방법  
  
```javascript
fuction Hello(name="friend"){
    let msg = `Hello, ${name}`
    console.log(msg)
}

Hello();  //Hello, friend
Hello("world!"); //Hello, world!
```

