import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getShippingUnits = async () => {
    let result: APIResponse = await axios.get('/api/shipping-unit/list');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getOrderStatus = async (order_display_limit: number, page: number, status: number, startDate: Date | null, endDate: Date | null) => {
    let start_date = startDate ? startDate : 0;
    let end_date = endDate ? endDate : 0;
    
    let result: APIResponse = await axios.get(`/api/shipping-unit/order?limit=${order_display_limit}&page=${page}&status=${status}&startDate=${start_date}&endDate=${end_date}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getOrderSearch = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/shipping-unit/order/search?id=${order_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return [];
}

export const getSUOrderDetail = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/shipping-unit/order/detail?id=${order_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const confirmReceiveOrderSeller = async (order_id: number, order_status: number) => {
    let result: APIResponse = await axios.put('/api/shipping-unit/order/received-confirmation', { id: order_id, order_status: order_status });
    return result;
}

export const handleShippingOrder = async (order_id: number) => {
    let result: APIResponse = await axios.put('/api/shipping-unit/order/shipping', { id: order_id });
    return result;
}

export const handleCompleteShippingOrder = async (order_id: number) => {
    let result: APIResponse = await axios.put('/api/shipping-unit/order/complete-shipping', { id: order_id });
    return result;
}

export const getSUDashboardData = async () => {
    let result: APIResponse = await axios.get('/api/shipping-unit/dashboard');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}