import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

interface INewProduct {
    name: string
    summary: string
    quantity: number
    price: number
    currentPrice: number
    sub_category_id: number
    image: any
}

interface IUpdateProduct {
    id: number
    name: string
    summary: string
    quantity: number
    price: number
    currentPrice: number
    sub_category_id: number
}

interface IUpdateSellerInfo {
    name: string
    mobile: string
    gender: number
    birth: Date
    image: File | null
}

interface IUpdateShopInfo {
    shopName: string
    intro: string
    image: File | null
}

export const getProductsPagination = async (product_display_limit: number, page: number, category: number, sub_category: number, sort: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products?limit=${product_display_limit}&page=${page}&category_id=${category}&sub_category_id=${sub_category}&sort_id=${sort}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getProductSearch = async (product_id: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products/search?id=${product_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getOrderSearch = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/seller/order/search?id=${order_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return [];
}

export const getOrderAll = async (order_display_limit: number, page: number, status: number, startDate: Date | null, endDate: Date | null) => {
    let start_date = startDate ? startDate : 0;
    let end_date = endDate ? endDate : 0;

    let result: APIResponse = await axios.get(`/api/seller/order?limit=${order_display_limit}&page=${page}&status=${status}&startDate=${start_date}&endDate=${end_date}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const deleteProduct = async (product_id: number) => {
    let result: APIResponse = await axios.delete(`/api/seller/product/${product_id}`);
    return result
}

export const getCategoryList = async () => {
    let result: APIResponse = await axios.get('/api/seller/categories');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSubCategoryByCategory = async (category_id: number) => {
    let result: APIResponse = await axios.get(`/api/seller/subcategories/${category_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const createNewProduct = async (data: INewProduct) => {

    const build_data = new FormData();
    build_data.append('name', data.name);
    build_data.append('summary', data.summary);
    build_data.append('quantity', `${data.quantity}`);
    build_data.append('price', `${data.price}`);
    build_data.append('currentPrice', `${data.currentPrice}`);
    build_data.append('image', data.image);
    build_data.append('sub_category_id', `${data.sub_category_id}`);

    let result: APIResponse = await axios.post(`/api/seller/product`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return result;
}

export const updateProduct = async (data: IUpdateProduct) => {

    let result: APIResponse = await axios.put(`/api/seller/product`, data);
    return result;
}

export const checkSellerEmailExist = async (email: string) => {
    let result: APIResponse = await axios.get(`/api/seller/register/email-validate?email=${email}`);
    return result;
}

export const getSellerInfo = async () => {
    let result: APIResponse = await axios.get('/api/seller/info');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const updateSellerInfo = async (data: IUpdateSellerInfo) => {

    const build_data = new FormData();
    build_data.append('name', data.name);
    build_data.append('mobile', data.mobile);
    build_data.append('gender', `${data.gender}`);
    build_data.append('birth', `${data.birth}`);
    build_data.append('image', data.image ? data.image : "");

    let result: APIResponse = await axios.post(`/api/seller/info`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return result;
}

export const getShopInfo = async () => {
    let result: APIResponse = await axios.get('/api/seller/shop/info');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const updateShopInfo = async (data: IUpdateShopInfo) => {

    const build_data = new FormData();
    build_data.append('shopName', data.shopName);
    build_data.append('intro', data.intro);
    build_data.append('image', data.image ? data.image : "");

    let result: APIResponse = await axios.post(`/api/seller/shop/info`, build_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return result;
}

export const confirmCustomerOrder = async (order_id: number, packing: boolean) => {
    let result: APIResponse = await axios.put('/api/seller/order/confirm', { id: order_id, packing: packing });
    return result;
}

export const packingCustomerOrder = async (order_id: number) => {
    let result: APIResponse = await axios.put('/api/seller/order/packing', { id: order_id });
    return result;
}

export const getOrderDetail = async (order_id: number) => {
    let result: APIResponse = await axios.get(`/api/seller/order/detail?id=${order_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getShopCategory = async () => {
    let result: APIResponse = await axios.get('/api/seller/shop/category');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const createShopCategory = async (category_title: string) => {
    let result: APIResponse = await axios.post('/api/seller/shop/category', { title: category_title });
    return result;
}

export const editShopCategory = async (category_id: number, category_title: string) => {
    let result: APIResponse = await axios.put('/api/seller/shop/category', { category_id: category_id, title: category_title });
    return result;
}

export const removeShopCategory = async (category_id: number) => {
    let result: APIResponse = await axios.delete(`/api/seller/shop/category/${category_id}`);
    return result;
}

export const getShopCategoryDetailExist = async (category_id: number, page: number, limit: number) => {

    let result: APIResponse = await axios.get(`/api/seller/shop/category/detail/exist?id=${category_id}&page=${page}&limit=${limit}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getShopCategoryDetailNotExist = async (page: number, limit: number, category_id: number, sub_category_id: number) => {

    let result: APIResponse = await axios.get(`/api/seller/shop/category/detail/not-exist?page=${page}&limit=${limit}&category_id=${category_id}&sub_category_id=${sub_category_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const addProductToCategoryShop = async (category_id: number, product_id: number) => {
    let result: APIResponse = await axios.post('/api/seller/shop/category/product', { category_id: category_id, product_id: product_id });
    return result;
}

export const removeProductOutCategoryShop = async (id: number) => {
    let result: APIResponse = await axios.delete(`/api/seller/shop/category/product/${id}`);
    return result;
}

export const getDashboardData = async () => {
    let result: APIResponse = await axios.get('/api/seller/dashboard');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getProducstAnnouncement = async (limit: number, page: number, type: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products/announce?type=${type}&page=${page}&limit=${limit}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const updateShopProductInventory = async (product_type_id: number, quantity: number) => {
    let result: APIResponse = await axios.put('/api/seller/products/inventory', { product_type_id: product_type_id, quantity: quantity });
    return result;
}

export const getProductInventorySearch = async (product_id: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products/inventory/search?id=${product_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return [];
}