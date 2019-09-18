import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index'
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './sagas/saga'


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);


export default store;