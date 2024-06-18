import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getCategoryList = async () => {
    let result: APIResponse = await axios.get('/api/categories');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getOnlyCategories = async () => {
    let result: APIResponse = await axios.get('/api/categories-only');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getCategoryInfo = async (category_id: number) => {
    let result: APIResponse = await axios.get(`/api/category?id=${category_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}