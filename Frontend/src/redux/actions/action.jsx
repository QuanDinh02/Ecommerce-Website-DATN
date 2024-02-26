import { INCREMENT, DECREMENT, USER_LOGIN, USER_LOGOUT } from './type';

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};

export const UserLogin = (data) => {
    return {
        type: USER_LOGIN,
        payload: data
    };
};

export const UserLogout = () => {
    return {
        type: USER_LOGOUT
    };
};