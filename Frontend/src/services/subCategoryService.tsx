import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getSubCategoryByCategory = async (category_id: number) => {
    let result: APIResponse = await axios.get(`/api/sub-category/category?id=${category_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const getSubCategoryInfo = async (sub_category_id: number) => {
    let result: APIResponse = await axios.get(`/api/sub-category?id=${sub_category_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}