import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getCustomerOrderAddress = async (customer_id: number) => {
    let result: APIResponse = await axios.get(`/api/customer/order-info?id=${customer_id}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}