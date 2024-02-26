import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer/rootReducer';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

const store = createStore(
    rootReducer,
    composeWithDevToolsDevelopmentOnly(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;