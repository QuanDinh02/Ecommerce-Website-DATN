import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import cartItemReducer from './cartItemReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    cartItem: cartItemReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;