import axios from '../customization/axiosCustomization';
import { APIResponse } from './common';

export const getProductsPagination = async (product_display_limit: number, page: number) => {
    let result: APIResponse = await axios.get(`/api/seller/products?limit=${product_display_limit}&page=${page}`);
    if (result && result?.DT) {
        return result.DT;
    }
    return null;
}

export const deleteProduct = async (product_id: number) => {
    let result: APIResponse = await axios.delete(`/api/seller/product/${product_id}`);
    return result
}

// export const createNewProduct = async (data:any ) => {
//     let result: APIResponse = await axios.post('/api/seller/product');
//     return result;
// }

// const postCreateNewUser = async (data) => {

//     const build_data = new FormData();
//     build_data.append('fullname', data.fullname);
//     build_data.append('username', data.username);
//     build_data.append('email', data.email);
//     build_data.append('phone', data.phone);
//     build_data.append('address', data.address);
//     build_data.append('dob', data.dob);
//     build_data.append('gender', data.gender);
//     build_data.append('facebook_url', data.facebook_url);
//     build_data.append('twitter_url', data.twitter_url);
//     build_data.append('user_group', data.user_group);
//     build_data.append('image', data.image);

//     return await axios.post(`/api/user`, build_data, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// }