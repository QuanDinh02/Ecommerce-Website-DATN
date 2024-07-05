import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

interface IUserChangePassword {
    email: string
    password: string
}

export const userLogin = async (username, password) => {
    let result: APIResponse = await axios.post("/api/user/login", {
        username, password
    });
    return result;
}

export const userSysLogin = async (username, password) => {
    let result: APIResponse = await axios.post("/api/user/sys/login", {
        username, password
    });
    return result;
}

export const userLogout = async () => {
    let result: any = await axios.get("/api/user/logout");
    return result;
}

export const userSysLogout = async () => {
    let result: any = await axios.get("/api/user/sys/logout");
    return result;
}

export const userRegister = async (data: any) => {
    let result: APIResponse = await axios.post("/api/user/register", data);
    return result;
}

export const userChangePassword = async (data: IUserChangePassword) => {
    let result: APIResponse = await axios.put("/api/user/change-password", data);
    return result;
}

export const checkCustomerEmailExist = async (email: string) => {
    let result: APIResponse = await axios.get(`/api/user/register/email-validate?email=${email}`);
    return result;
}

export const checkEmailWebsiteUserExist = async (email: string) => {
    let result: APIResponse = await axios.get(`/api/user/change-password/email-validate?email=${email}`);
    return result;
}

export const fetchAccount = async () => {
    let result: any = await axios.get("/api/user/account");
    return result;
}

export const fetchSysAccount = async () => {
    let result: any = await axios.get("/api/user/sys/account");
    return result;
}