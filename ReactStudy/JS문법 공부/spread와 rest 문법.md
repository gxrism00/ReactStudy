# Spread

> 이 문법을 사용하면, 객체 혹은 배열을 펼칠 수 있다.

```javascript
const slime = {
  name: '슬라임'
};

const cuteSlime = {
  ...slime,
  attribute: 'cute'
};

const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple'
};

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime); //{name:'슬라임',attribute: 'cute',color: 'purple'}
```

```javascript
const animals = ['개', '고양이', '참새'];
const anotherAnimals = [...animals, '비둘기'];
console.log(animals);
console.log(anotherAnimals);// ['개','고양이','참새','비둘기']
```

>배열에서도 가능
```javascript
const numbers = [1, 2, 3, 4, 5];

const spreadNumbers = [...numbers, 1000, ...numbers];
console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
```

>문자열에서 사용하면 문자열이 분해됨
```javascript
const text = "Hello";

const spreadText = [...text];
console.log(spreadText); // ['H','e','l','l','o']
```

# Rest

>rest는 생김새는 spread 랑 비슷한데, 역할이 매우 다름, 객체, 배열, 함수의 파라미터에서 사용 가능
* 객체에서의 rest
```javascript
const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple'
};

const { color, ...noColorCuteSlime } = purpleCuteSlime;
console.log(color); //purple
console.log(noColorCuteSlime); //{name:'슬라임',attribute:'cute'}
```
nocolorCuteSlime안에 color를 제외한 나머지 값이 들어감

* 배열에서의 rest

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [one, ...rest] = numbers;

console.log(one); //0
console.log(rest); //[1, 2, 3, 4, 5, 6]
```

But 아래와 같이는 할 수 없다.
```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [..rest, last] = numbers; //error
```