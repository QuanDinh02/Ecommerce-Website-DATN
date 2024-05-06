import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import cartItemReducer from './cartItemReducer';
import wishListReducer from './wishListReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    cartItem: cartItemReducer,
    wishList: wishListReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;