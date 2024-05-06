import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

// export interface INewCartItem {
//     quantity: number
//     customerID: number
//     productTypeID: number
// }

// interface IUpdateCartItem {
//     id: number
//     quantity: number
// }

export const fetchWishList = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/wish-list?id=${customer_id}`);
    return result;
}

// export const createCartItem = async (data: INewCartItem) => {
//     let result: APIResponse = await axios.post('/api/cart-item', data);
//     return result;
// }

// export const updateCartItem = async (data: IUpdateCartItem) => {
//     let result: APIResponse = await axios.put('/api/cart-item', data);
//     return result;
// }

// export const deleteCartItem = async (cart_item_id: number) => {
//     let result: APIResponse = await axios.delete(`/api/cart-item/${cart_item_id}`);
//     return result;
// }