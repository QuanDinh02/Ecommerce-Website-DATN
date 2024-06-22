import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getShippingUnits = async () => {
    let result: APIResponse = await axios.get('/api/shipping-unit/list');
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}