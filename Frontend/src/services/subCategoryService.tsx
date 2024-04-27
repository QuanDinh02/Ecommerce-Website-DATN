import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getSubCategoryByCategory = async (category_id: number) => {
    let result: APIResponse = await axios.get(`/api/sub-category/category?id=${category_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}