import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface IActivity {
    product_id: number
    type: number // 0 - click, 1 - buy, 2 - favorite
}

interface IUpdateCustomerInfo {
    name: string
    mobile: string
    gender: number
    birth: Date
    image: File | null
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

interface IUpdateAddress {
    id: number
    fullname: string
    mobile: string
    street: string
    ward: string
    district: string
    province: string
}

interface ISubCategory {
    id: number
    title: string
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

export const updateAddress = async (data: IUpdateAddress) => {
    let result: APIResponse = await axios.put('/api/customer/info/address/update', data);
    return result;
}

export const removeCustomerAddress = async (address_id: number) => {
    let result: APIResponse = await axios.delete(`/api/customer/info/address/${address_id}`);
    return result;
}

export const updateCustomerInfo = async (data: IUpdateCustomerInfo) => {

    const build_data = new FormData();
    build_data.append('name', data.name);
    build_data.append('mobile', data.mobile);
    build_data.append('gender', `${data.gender}`);
    build_data.append('birth', `${data.birth}`);
    build_data.append('image', data.image ? data.image : "");

    let result: APIResponse = await axios.post(`/api/customer/info`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return result;
}

export const updateCustomerPassword = async (data: IUpdateCustomerPassword) => {
    let result: APIResponse = await axios.put('/api/customer/info/password', data);
    return result;
}

export const checkNewCustomer = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/new-customer/check?id=${customer_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const trainingNewCustomer = async (data: ISubCategory[], customer_id: number) => {
    let result: APIResponse = await axios.post('/api/new-customer/training', {
        data: data,
        customer_id: customer_id
    });
    return result;
}

export const deleteNewCustomer = async (customer_id: number) => {
    let result: APIResponse = await axios.delete(`/api/new-customer/remove/${customer_id}`);
    return result;
}