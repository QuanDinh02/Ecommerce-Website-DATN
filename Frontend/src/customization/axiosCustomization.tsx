import axios from 'axios';
import axiosRetry from 'axios-retry';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

instance.defaults.withCredentials = true;

axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => {
        return error.response?.status === 400 ||  error.response?.status === 405;
    },
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log("check response: ",response.data);
    return response && response.data ? response.data : response;
}, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err.response?.status || 500;
    // we can handle global errors here

    switch (status) {
        // authentication (token related issues)
        case 401: {
            // toast.error("You are unauthenticated !");
            return err.response.data;

            //Promise.reject(err)
        }

        // forbidden (permission related issues)
        case 403: {
            // toast.error("You are not permission to access this route !");
            return err.response.data;
        }

        // case 405: {
        //     // toast.error("You are unauthenticated !");
        //     return err.response.data;

        //     //Promise.reject(err)
        // }

        // // bad request
        // case 400: {
        //     return Promise.reject(err);
        // }

        // not found
        case 404: {
            return Promise.reject(err);
        }

        // conflict
        case 409: {
            return Promise.reject(err);
        }

        // unprocessable
        case 422: {
            return Promise.reject(err);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err);
        }
    }

});

export default instance;