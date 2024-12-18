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
    shippingUnit: number
    paymentMethod: number
    phone: string
    fullName: string
    address: string
    note: string
    customerID: number
    order_items: IOrderItemInfo[]
}

interface IProductReview {
    id: number
    rating: number
    comment: string
}

interface IProduct {
    id: number
    name: string
    review: IProductReview
}

export const createNewOrder = async (data: IOrder) => {
    let result: APIResponse = await axios.post('/api/order', data);
    return result;
}

export const getAllOrderByCustomer = async (customer_id: number, status: number) => {
    let result: APIResponse = await axios.get(`/api/order?id=${customer_id}&status=${status}`);
    return result;
}

export const getSearchCustomerOrder = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/order/search?id=${order_id}`);
    return result;
}

export const getCustomerOrderDetail = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/order/detail?id=${order_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getOrderItemInfoForRating = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/order/rating?id=${order_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const customerRatingProduct = async (product_data: IProduct, order_id: number) => {

    let data = {
        order_id: order_id,
        product_data: product_data
    }
    
    let result: APIResponse = await axios.post('/api/order/rating', data);
    return result;
}

export const customerCancelOrder = async (order_id: number) => {
    let result: APIResponse = await axios.delete(`/api/order/cancel/${order_id}`);
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


