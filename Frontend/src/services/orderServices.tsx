import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface IOrderItemInfo {
    productID: number
    quantity: number
    price: number
}

interface IOrder {
    status: number
    shipFee: number
    totalPrice: number
    shipMethod: number
    paymentMethod: number
    address: string
    note: string
    customerID: number
    order_items: IOrderItemInfo[]
}

export const createNewOrder = async (data: IOrder) => {
    let result: APIResponse = await axios.post('/api/order', data);
    return result;
}

export const getAllOrderByCustomer = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/order?id=${customer_id}`);
    return result;
}

export const getAllShippingMethod = async () => {
    let result: APIResponse = await axios.get('/api/order/shipping-method');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getAllPaymentMethod = async () => {
    let result: APIResponse = await axios.get('/api/order/payment-method');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}


