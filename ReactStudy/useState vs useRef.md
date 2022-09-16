# useState vs useRef

- useState는 set함수에 의해 값이 변하면 재렌더링이 되고  
- useRef는 .current에 의해 값이 변해도 재렌더링이 되지않는다.  
    또한 useRef로 선언된 변수는 var나let으로 선언된 변수와 다르게 재렌더링이전의 값을 유지한다.
    (var나let은 재렌더링되면 초기지정값으로 재할당됨)

[출처]
https://www.youtube.com/watch?v=VxqZrL4FLz8