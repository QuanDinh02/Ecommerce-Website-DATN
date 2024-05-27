import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface IActivity {
    product_id: number
    type: number // 0 - click, 1 - buy, 2 - favorite
}

export const getCustomerOrderAddress = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/customer/order-info?id=${customer_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const saveCustomerSearch = async (content: string) => {
    let result: APIResponse = await axios.post('/api/search-history', { content: content });
    return result;
}

export const saveCustomerActivity = async (data: IActivity) => {
    let result: APIResponse = await axios.post('/api/session-activity', data);
    return result;
}