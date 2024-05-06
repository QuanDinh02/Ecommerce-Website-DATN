import { ADD_WISHLIST_ITEM, DELETE_WISHLIST_ITEM } from '../actions/type';

const INITIAL_STATE = {
    wish_list_count: 0,
    wish_list_list: [
        {
            id: 0,
            price: 0,
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

const wishListReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ADD_WISHLIST_ITEM:

            return {
                ...state,
                wish_list_list: [...action.wish_list_item],
                wish_list_count: action.wish_list_count
            };

        case DELETE_WISHLIST_ITEM:

            let newWishList = state.wish_list_list.filter(item => item.id !== action.wish_list_item_id);

            return {
                ...state,
                wish_list_count: state.wish_list_count - 1,
                wish_list_list: [...newWishList]
            };

        default: return state;

    }

};

export default wishListReducer;