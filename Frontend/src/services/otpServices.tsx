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

export const sendOTPSellerSignUp = async (email: string) => {
    let result: APIResponse = await axios.post('/api/seller/register/verification-code', { email: email });
    return result;
}

export const verifyOTPSellerrSignUp = async (email: string, otp: string) => {
    let result: APIResponse = await axios.post('/api/seller/register/verify', { email: email, otp: otp });
    return result;
}

export const sendOTPChangePassword = async (email: string) => {
    let result: APIResponse = await axios.post('/api/user/change-pasword/verification-code', { email: email });
    return result;
}

export const verifyOTPUserChangePasswordSignUp = async (email: string, otp: string) => {
    let result: APIResponse = await axios.post('/api/user/change-pasword/verify', { email: email, otp: otp });
    return result;
}