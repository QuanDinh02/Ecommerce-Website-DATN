import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const fetchCartItem = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/cart-item?id=${customer_id}`);
    return result;
}