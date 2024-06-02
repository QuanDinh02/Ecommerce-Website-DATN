import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface IActivity {
    product_id: number
    type: number // 0 - click, 1 - buy, 2 - favorite
}

interface IUpdateCustomerInfo {
    id: number
    name: string
    mobile: string
    gender: number
    birth: Date
}

interface IUpdateCustomerPassword {
    old_password: string
    new_password: string
}

interface INewAddress {
    fullname: string
    mobile: string
    street: string
    ward: string
    district: string
    province: string
    country: string
    type: number
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

export const getCustomerInfo = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/customer/info?id=${customer_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getCustomerAddress = async () => {
    let result: APIResponse = await axios.get('/api/customer/info/address');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const createNewAddress = async (data: INewAddress) => {
    let result: APIResponse = await axios.post('/api/customer/info/address', data);
    return result;
}

export const updateDefaultAddress = async (address_id: number) => {
    let result: APIResponse = await axios.put('/api/customer/info/address', { id: address_id });
    return result;
}

export const removeCustomerAddress = async (address_id: number) => {
    let result: APIResponse = await axios.delete(`/api/customer/info/address/${address_id}`);
    return result;
}

export const updateCustomerInfo = async (data: IUpdateCustomerInfo) => {
    let result: APIResponse = await axios.put('/api/customer/info', data);
    return result;
}

export const updateCustomerPassword = async (data: IUpdateCustomerPassword) => {
    let result: APIResponse = await axios.put('/api/customer/info/password', data);
    return result;
}