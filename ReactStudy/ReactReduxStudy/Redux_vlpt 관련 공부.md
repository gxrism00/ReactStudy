# Redux.vlpt.us 관련 공부


> **Procider**는 react-redux 라이브러리에 내장되어 있는, store를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트이다.

```javascript
// Redux 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```