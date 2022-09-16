# for ...of vs for ...in

## for ...of

- 반복 가능한 객체(Array, String, Map, Set 등등)에 대해 반복한다.

```javascript
  //Array
  const array1 = ['a', 'b', 'c'];
  let iterable = [10, 20, 30];

  for (const element of array1) {
    console.log(element);  // "a" "b" "c"
  }
  for (let value of iterable) {
    console.log(value); // 10 20 30
  }
  
  //String
  let iterable = "boo";

  for (let value of iterable) {
    console.log(value); // "b" "o" "o"
  }

  //Map
  let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

  for (let entry of iterable) {
    console.log(entry); // [a, 1] [b, 2] [c, 3]
  }

  for (let [key, value] of iterable) {
    console.log(value); // 1 2 3
  }
```

## for ...in

- 인덱스의 순서가 중요한 Array에서 반복을 위해 사용할 수 없다.
- `for...in`이 객체의 반복을 위해 만들어졌지만, 배열의 반복을 위해서는 추천되지 않는다.
- 실질적으로 디버깅을 위해 사용

```javascript
  var obj = {a: 1, b: 2, c: 3};

  for (const prop in obj) {
    console.log(`obj.${prop} = ${obj[prop]}`); // "obj.a = 1" "obj.b = 2" "obj.c = 3"
  }
  for (const prop in obj) {
    console.log(prop , obj[prop]); 
  }
```

## 차이

- `for...of` 는 컬렉션 전용입니다. 모든 객체보다는, [Symbol.iterator] 속성이 있는 모든 컬렉션 요소에 대해 반복
- `for...in` 은 객체의 모든 열거가능한 속성에 대해 반복

```javascript
  Object.prototype.objCustom = function () {};
  Array.prototype.arrCustom = function () {};

  let iterable = [3, 5, 7];
  iterable.foo = "hello";

  for (let i of iterable) {
    console.log(i); // logs 3, 5, 7
  }

  for (let i in iterable) {
    console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
  }
```

## 결론

- `for ...of` 은 반복 가능한 객체에서만 사용 가능
- `for ...in` 은 모든 객체에 대해서 사용 가능

[출처] `MDN` for...of와 for...in의 차이
