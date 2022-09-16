# input에서 onchange vs oninput?

HTML에서는
- onChange : input에서 포커스가 벗어났을 때 input에 입력된 값이 이전과 다르면 onChange 이벤트가 발생함.
- onInput : input에 값이 변경될 때마다 onInput 이벤트가 발생함.
이렇게 onChange와 onInput 이벤트에 차이가 있는데

> 리액트에서는 onChange도 onInput처럼 input value가 변경될 때마다 (focus out을 꼭 하지 않아도, 입력 중에도) 발동 됨  
> 그래서 onChange와 onInput 이벤트가 사실상 동일한 이벤트로 취급되고,
이중에 더 자주 사용되는 것은 onChange

[출처]
https://velog.io/@seomoon/React-Input-onChange-onInput-%EC%9D%B4%EB%B2%A4%ED%8A%B8
https://reactjs.org/docs/events.html#form-events
------------------------------
