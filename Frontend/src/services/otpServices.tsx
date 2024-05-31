import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const sendOTPCustomerSignUp = async (email: string) => {
    let result: APIResponse = await axios.post('/api/customer/register/verification-code', { email: email });
    return result;
}

export const verifyOTPCustomerSignUp = async (email: string, otp: string) => {
    let result: APIResponse = await axios.post('/api/customer/register/verify', { email: email, otp: otp });
    return result;
}