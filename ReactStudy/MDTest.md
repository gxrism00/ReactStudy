

# useState 와 props

 - 순서가 필요한
    `블라블라블라`
    ```
    이런저런     
    이야기 라네
    이야이야
    이야이야
    헷갈린다
    ```

    -"블라블라"
    여기서는 `띄어쓰기`
    불가능하고 알트헨터도 아먹는데
 - Readme.md  
    - 이렇게 작성 가능하긴하네
    - 오호 
    - 굿 

 - 그다음

|값 | 의미  | 기본값
|---|:---:|---:
|`static` | 유형(기준) 없음 / 배치 불가능 | 'static'
|`relative` | 요소 **자신**을 기준으로 배치 | 'dhkt'
|`absolute` | 위치 상 **_부모_(조상)요소**를 기준으로 배치 |
|`fixed` | **브라우저 창**을 기준으로 배치 |

<br />

----

<br />

## code : test
```javascript
import Select from 'react-select'

export default function Testdown(){

    const MyComponent = () => (
        <Select options={options} />
    )

    return (
        <div>
        <select>
            <option value="1-10">1-10</option>
            <option value="10-15">10-15</option>
            <option value="15-20">15-20</option>
            <option value="20+">20+</option>
        </select>
        <button>test </button>
        <MyComponent />
        </div>
    ) ;
}
 ```
asvzx
this is a normal paragraph:

    this is a code block.

end code block