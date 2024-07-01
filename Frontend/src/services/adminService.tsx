import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface INewSU {
    nameUnit: string
    address: string
    mobile: string
    description: string
    username: string
    password: string
}

interface IUpdateSU {
    id: number
    nameUnit: string
    address: string
    mobile: string
    description: string
}

interface IChangePassword {
    su_id: number
    old_password: string
    new_password: string
}

export const getAnalysisProduct = async (product_display_limit: number, page: number, category: number, sub_category: number, sort: number) => {
    let result: APIResponse = await axios.get(`/api/admin/analysis-product?limit=${product_display_limit}&page=${page}&category_id=${category}&sub_category_id=${sub_category}&sort_id=${sort}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getAnalysisProductSearch = async (product_id: number) => {
    let result: APIResponse = await axios.get(`/api/admin/analysis-product/search?id=${product_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getAdminDashboardData = async () => {
    let result: APIResponse = await axios.get('/api/admin/dashboard');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getCustomerList = async (customer_display_limit: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/admin/customer?limit=${customer_display_limit}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getCustomerSearch = async (search: string) => {
    let result: APIResponse = await axios.get(`/api/admin/customer/search?search=${search}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSellerList = async (seller_display_limit: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/admin/seller?limit=${seller_display_limit}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSellerSearch = async (search: string) => {
    let result: APIResponse = await axios.get(`/api/admin/seller/search?search=${search}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getShippingUnitList = async (shipping_display_limit: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/admin/shipping-unit?limit=${shipping_display_limit}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getShippingUnitSearch = async (search: string) => {
    let result: APIResponse = await axios.get(`/api/admin/shipping-unit/search?search=${search}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const createNewShippingUnit = async (data: INewSU) => {
    let result: APIResponse = await axios.post('/api/admin/shipping-unit', data);
    return result;
}

export const updateShippingUnit = async (data: IUpdateSU) => {
    let result: APIResponse = await axios.put('/api/admin/shipping-unit', data);
    return result;
}

export const changePasswordShippingUnit = async (data: IChangePassword) => {
    let result: APIResponse = await axios.put('/api/admin/shipping-unit/password', data);
    return result;
}
