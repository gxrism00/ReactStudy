# map vs forEach

## forEach

- forEach 메서드는 for문을 대체할 수 있는 함수다.  
- forEach 메서드는 자신의 내부에서 반복문을 실행한다.
- 즉, forEach 메서드는 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야할 처리를 콜백 함수로 전달받아 반복 호출한다.

```javascript
const numbers=[1,2,3];
const powers = [];
numbers.forEach(x=>powers.push(x**2));
console.log(powers); //[1,4,9]
```

- forEach 메서드는 원본 배열을 변경하지 않는다.
- forEach 메서드의 반환값은 언제나 undefined다.

## map

- map 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다.(여기까지는 forEach와 동일) 
- 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다!(forEach와 가장 큰 차이점)

```javascript
const numbers=[1,2,3];
const mult = numbers.map(x=>x*2);
console.log(mult) // [2,4,6];
```

- 이때 원본 배열은 변경하지 않는다.
- map 메서드에서는 원본 배열의 원소와 일대일 mapping이 진행되기 때문에 원본 배열과 mapping후 배열의 길이는 항상 같다.

## 결론

- forEach 메서드는 단순히 반복문을 대체하기 위한 함수이고
- map 메서드는 요소값을 다른 값으로 mapping한 새로운 배열을 생성하기 위한 고차함수다.

출처: https://d-cron.tistory.com/11 from 모던 자바스크립트 Deep Dive(이웅모 지음)