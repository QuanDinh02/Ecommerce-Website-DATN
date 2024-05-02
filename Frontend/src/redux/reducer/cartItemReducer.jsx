import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../actions/type';

const INITIAL_STATE = {
    cart_item_count: 0,
    cart_item_list: [
        {
            id: 0,
            quantity: 0,
            price: 0,
            product_info: {
                id: 0,
                name: "",
                image: "",
            }
        }
    ]
};

const cartItemReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_CART_ITEM:

            return {
                ...state,
                cart_item_list: [...action.cart_item],
                cart_item_count: state.cart_item_count + action.cart_item_count
            };

        case DELETE_CART_ITEM:

            return {
                ...state,
                cart_item_count: 0,
                cart_item_list: [],
            };

        default: return state;

    }

};

export default cartItemReducer;