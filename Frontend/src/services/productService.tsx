import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getProductsByCategory = async (category_id: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/products/category?limit=${20}&id=${category_id}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getProductsBySubCategory = async (sub_category_id: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/products/sub-category?limit=${20}&id=${sub_category_id}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSearchProducts = async (product_name: string) => {
    let result: APIResponse = await axios.get(`/api/products/search?name=${product_name}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getProductDetailInfo = async (product_id: number) => {
    let result: APIResponse = await axios.get(`/api/product/detail?id=${product_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getProductReview = async (product_id: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/product/detail/review?limit=${10}&id=${product_id}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getProductListBySearch = async (search_content: string, search_page: number) => {
    let result: APIResponse = await axios.get(`/api/products/search-page?limit=${20}&content=${search_content}&page=${search_page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}