import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

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
