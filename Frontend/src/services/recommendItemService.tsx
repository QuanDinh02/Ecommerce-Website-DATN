import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getRecommendItemByCustomer = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/recommend?id=${customer_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}
