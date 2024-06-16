import { ADD_CART_ITEM, UPDATE_CART_ITEM, DELETE_CART_ITEM, CLEAR_ALL_CART_ITEM } from '../actions/type';

const INITIAL_STATE = {
    cart_item_count: 0,
    cart_item_list: [
        {
            id: 0,
            quantity: 0,
            price: 0,
            color: "",
            size: "",
            product_info: {
                id: 0,
                name: "",
                image: "",
            },
            shop_info: {
                id: 0,
                name: ""
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
                cart_item_count: action.cart_item_count
            };

        case UPDATE_CART_ITEM:
            let updateCartItemList = state.cart_item_list.map(item => {
                if (item.id === +action.cart_item_id) {
                    return {
                        ...item, quantity: action.cart_item_quantity
                    }
                }
                return item;
            });

            return {
                ...state,
                cart_item_list: [...updateCartItemList],
            };

        case DELETE_CART_ITEM:
            let newCartItemList = state.cart_item_list.filter(item => item.id !== action.cart_item_id);

            return {
                ...state,
                cart_item_count: state.cart_item_count - 1,
                cart_item_list: [...newCartItemList],
            };

        case CLEAR_ALL_CART_ITEM:

            return {
                ...state,
                cart_item_count: 0,
                cart_item_list: [],
            };
        default: return state;

    }

};

export default cartItemReducer;