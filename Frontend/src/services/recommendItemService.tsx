import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const getRecommendItemByCustomer = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/recommend?id=${customer_id}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const startTrainingRecommendItemData = (customer_id: number) => {
    axios.get(`/api/simulating-training-recommend-item?customer_id=${customer_id}`);
    return 0;
}

export const getProductWithImageByCustomer = async (data: any) => {
    let result: APIResponse = await axios.post('/api/image/products',data);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}
