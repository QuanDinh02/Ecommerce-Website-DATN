import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

interface INewWishList {
    productID: number
    customerID: number
}

export const fetchWishList = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/wish-list?id=${customer_id}`);
    return result;
}

export const createWishListItem = async (data: INewWishList) => {
    let result: APIResponse = await axios.post('/api/wish-list', data);
    return result;
}

export const deleteWishListItem = async (id: number) => {
    let result: APIResponse = await axios.delete(`/api/wish-list/${id}`);
    return result;
}


