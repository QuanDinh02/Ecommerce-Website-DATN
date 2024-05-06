import { 
    INCREMENT, DECREMENT, 
    USER_LOGIN, USER_LOGOUT,
    ADD_CART_ITEM, UPDATE_CART_ITEM, DELETE_CART_ITEM,
    ADD_WISHLIST_ITEM, DELETE_WISHLIST_ITEM
} from './type';

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

export const AddCartItem = (data) => {
    return {
        type: ADD_CART_ITEM,
        cart_item: data.cart_items,
        cart_item_count: data.count
    };
};

export const UpdateCartItem = (data) => {
    return {
        type: UPDATE_CART_ITEM,
        cart_item_id: +data.id,
        cart_item_quantity: +data.quantity
    };
};

export const DeleteCartItem = (data) => {
    return {
        type: DELETE_CART_ITEM,
        cart_item_id: +data.id
    };
};

export const AddWishListItem = (data) => {
    return {
        type: ADD_WISHLIST_ITEM,
        wish_list_item: data.wish_list_item,
        wish_list_count: data.wish_list_count
    };
};

export const DeleteWishListItem = (data) => {
    return {
        type: DELETE_WISHLIST_ITEM,
        wish_list_item_id: data.id
    };
};