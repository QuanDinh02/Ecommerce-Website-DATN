import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getProductsPagination = async (product_display_limit: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products?limit=${product_display_limit}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}