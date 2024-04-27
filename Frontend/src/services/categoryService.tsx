import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

// export const fetchCustomersWithPagination = async (currentPage) => {
//     let result: APIResponse = await axios.get(`/api/customer-management?limit=${LIMIT}&page=${currentPage}`);
//     if (result && result?.DT) {
//         return result.DT;
//     }
//     return null;
// }

export const getCategoryList = async () => {
    let result: APIResponse = await axios.get('/api/categories');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}