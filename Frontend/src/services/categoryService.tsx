import axios from '../customization/axiosCustomization';

const LIMIT: number = 10;

export interface APIResponse {
    EC: number
    DT: any
    EM: string
}

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