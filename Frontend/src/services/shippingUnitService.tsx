import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getShippingUnits = async () => {
    let result: APIResponse = await axios.get('/api/shipping-unit/list');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getOrderStatus = async (order_display_limit: number, page: number, status: number) => {
    let result: APIResponse = await axios.get(`/api/shipping-unit/order?limit=${order_display_limit}&page=${page}&status=${status}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSUOrderDetail = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/shipping-unit/order/detail?id=${order_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}