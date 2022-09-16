# HTML에서 DOM 명령어

- 기본형태 `document.명령어`
- ex) const Test = `document.getElementById('giwon')`

<br />
  
## 노드 접근

- `document.documentElemnet` : html에 접근
- `document.body` : body에 접근
- `document.head` : head에 접근
- `document.getElementById('giwon'`)` : id가 giwon인 요소를 반환
- `document.getElementsByTagName('p')` : p태그 요소들 반환
- `document.getElementsByClassName('link')` : link라는 ClassName을 가진 요소들 반환
- `document.querySelectorAll(.link)` : link라는 ClassName을 가진 요소들 반환
- `document.querySelector(#giwon)` : id가 giwon인 요소를 반환

**document.명령어(조건)** 이런 식으로 이해 하면 됨
이 밖의 많은 명령어가 있음, 그러나 자주 쓰는건 `getElement`나 `querySelector`

<br />
<br />

## 부모, 자식, 형제 노드,요소 탐색


```javascript
    const select = `document.getElementById('select');
```

- 모든 노드를 반환

  >**부모** : `select.parentNode`  
  >**자식** : `select.childNodes` (firstChild, lastChild 도 있음)
  > **형제** : `select.previousSibling`  
    　　　`select.nextSibling`

- 요소 노드만 반환
  >**부모** : `select.parentElemnet`  
  >**자식** : `select.children` (firstElementChild, lastElementChild 도 있음)  
  > **형제** : `select.previousElementSibling`  
    　　　`select.nextElementSibling`

<br />
<br />

## DOM 노드 생성, 추가, 복제, 삭제

### 생성, 추가

```javascript
    const blue = document.getElementById('blue')

    blue.innerHTML = '<li>Red</li>';  
    //단점은 추가 시 이전 것 그대로 또 써야함  
    blue.innerHTML = '<li>Red</li><li>Blue</li>';
```

- 다른 방법

```javascript
    const newLi = document.createElement('li');  //newLi=<li></li>
    newLi.innerHTML = green; //newLi=<li>green</li>
    const ul = document.getElementById('color');
    ul.appendChild(newLi);
```

- innerHTML 사용 안하기

```javascript
    const ul = document.getElementById('color');
    const newLi = document.createElement('li');  //newLi=<li></li>
    const newText = document.createTextNode('pink'); //newText ="pink"
    const newLi.appendChild(newText);
    ul.appendChild(newLi);

    //원하는 위치가 아니라면
    const red = document.getElementById('red');
    ul.insertBefore(newLi,red)  //레드앞에 넣어라
```

### 복제

```javascript
    const newLi = document.createElement('li');
    newLi.innerHTML = black; 
    const newBlack =newLi.cloneNode(); //노드 자신만 달랑 복제 <li></li> 출력
    const newBlack2 =newLi.cloneNode(true); //자식 노드까지 복제 <li>black</li> 출력
```

### 삭제

```javascript
    const ul = document.getElementById('color');
    const red = document.getElementById('red');
    ul.removeChild(red); //red 삭제

    ul.removeChild(firstElementChild); //첫번째 자식 노드 삭제
    ul.removeChild(lastElementChild); //마지막 자식 노드 삭제
```

## CSS style, class 제어

```javascript
    const box = getElementById('box');
    box.style()
    box.className()
    box.classList() //add 나  replace같은 메소드 지원함
    box.classList.add()
    box.classList.replace()
```

## 이벤트 핸들러

- 이벤트 추가

```html
    <button onclick="alert('Hello')">클릭1</button>
    <button onclick="sayHello()">클릭2</button>
    <button id="btn">클릭3</button>
    <button id="btn2">클릭4</button>
    <script>
        function sayHello(){
            alert("Hello");
        } 
        const el =document.getElementById('btn');
        el.onclick =sayHello;

        const el2 =document.getElementById('btn2');
        el2.addEventListener("click",sayHello);
        el2.addEventListener("click",()=>alert("Hello");));

        //다 같은 아웃풋을 낸다.

        //자주 사용하는건
        el2.addEventListener("click",sayHello);
        // 이 방식

    </script>
```

- 이벤트 삭제
  
```html
    <button id="btn">클릭</button>
    <script>
        function sayHello(){
            alert("Hello");
        } 
 
        const el =document.getElementById('btn');
        el.addEventListener("click",sayHello);


        el.removeEventListener("click",sayHello);

    </script>
```

- 다양한 이벤트

>더블클릭(dbclick), 키업(keyup), 포커스(focus), 블러(blur)

```html
    <button id="btn">클릭</button>
    <input id="txt" type="text"/>
    <script>
        function sayHello(){
            alert("Hello");
        } 
 
        const el =document.getElementById('btn');
        el.addEventListener("dbclick",sayHello); //더블 클릭 이벤트 

        const input =document.getElementById('txt');
        input.addEventListener("keyup",(event)=>{
            ...
            //KeyboardEvent 를 받음 (안에는 다양한 것들이 존재)
            //event.key 같은 것들 사용할 수있음
        })); //input 창에 사용자가 키를 입력할 때 발생

        //인풋에는 focus/focusin, blur/focusout 같은 키워드가 존재
        input.addEventListener("focus",(event)=>{}); //포커스를 얻으면 발생
        input.addEventListener("blur",(event)=>{}); //포커스를 잃으면 발생


    </script>
```

>마우스이벤트 mousemove, 

```javascript
    <div id="box">대충 크기가 있는 박스(스타일 생략)</div>
    <script>
        const box =document.getElementById("box");
        box.addEventListener("mousemove", (event)=>{
            event.clientX
            event.clientY
            //clientX와 clientY를 사용하면 마우스 커서 찍기 가능
        }); //박스 내부에서 마우스를 움직일 때 마다 발생

        
    <script>
```

>window resize 이벤트

```javascript
    <script>
        window.addEventListener("resize",()=>{
            window.innerWidth
            window.innerHeigth
            //창 너비와 높이값을 반환
        });
    <script>
```

> 이 밖의 이벤트 타입은 엄청 많다.
