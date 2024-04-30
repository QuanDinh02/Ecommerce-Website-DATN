import axios from '../customization/axiosCustomization';
import { APIResponse, LIMIT } from './common';

export const userLogin = async (username, password) => {
    let result:APIResponse =  await axios.post("/api/user/login", {
        username, password
    });
    return result;
}

export const userLogout = async () => {
    let result:any = await axios.get("/api/user/logout");
    return result;
}

export const userRegister = async () => {
    let result:any = await axios.get("/api/user/register");
    return result;
}

export const fetchAccount = async () => {
    let result:any = await axios.get("/api/user/account");
    return result;
}