import { USER_LOGIN, USER_LOGOUT } from '../actions/type';

const INITIAL_STATE = {
    isAuthenticated: false,
    account: {},
    role: "customer"
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_LOGIN:

            return {
                ...state,
                isAuthenticated: action?.payload?.isAuthenticated,
                account: action?.payload?.account,
                role: action?.payload?.account?.role === "seller" ? "seller" : "customer"
            };

        case USER_LOGOUT:

            return {
                ...state,
                isAuthenticated: false,
                account: {},
            };

        default: return state;

    }

};

export default userReducer