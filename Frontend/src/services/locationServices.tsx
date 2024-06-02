import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getAllProvinces = async () => {
    let result: APIResponse = await axios.get('/api/provinces');
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getDistrictsByProvince = async (province_code: number) => {
    let result: APIResponse = await axios.get(`/api/districts/province/${province_code}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}

export const getWardsByDistrict = async (district_code: number) => {
    let result: APIResponse = await axios.get(`/api/wards/district/${district_code}`);
    if (result && result.EC === 0) {
        return result.DT;
    }
    return null;
}