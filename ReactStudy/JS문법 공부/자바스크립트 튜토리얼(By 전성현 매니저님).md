## [22.06.22]

1. 블로그를 볼 땐 항상 틀릴 수 있다는 것을 명심하고 봐야한다.  
블로그는 참고만하는게 좋다.

2. 개괄적인 것을 볼 땐 https://ko.javascript.info/ 이 곳을 참고하라.

3. **MDN** : 완전히 정확하게 볼 땐 MDN 들어가서 스펙 또는 명세를 보아라. 
https://developer.mozilla.org/ko/docs/Web/JavaScript

## [22.08.05]

1. **map**과 **for**은 다르다  
(map은 찍어서 보여주는 역할에 가깝다, 맵안에서는 외부참조를 안하는게 맞다.)  
2. **단일 책임 원칙**을 지켜라  
(UI, data, action(method) 별로 구분해서 함수를 작성하는게 좋다.)
3. **추상화**를 해두는게 좋다.
4. **함수표현식**으로 사용 하여라  
   -`함수 선언식` : 함수명이 정의되어 있고, 별도의 할당 명령이 없는 것, 호이스팅 O

   ```javascript
   function sum(a,b) {
    return a + b;
    }
    ```

   -`함수 표현식` : 정의한 function을 별도의 변수에 할당하는 것, 호이스팅 과정에서 일시적 사각지대(TDZ)에 빠질 수 있다.

   ```javascript
   const sum = function(a,b) {
    return a + b;
    }
    ```

5. 블락요소 내에서 스코프에서 변수가 초기화 되는지  체크하고 라이프 사이클 체크
	
