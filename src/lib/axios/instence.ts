import axios from "axios";

const headers = {
    Accept: "application/json",
    'Content-type': 'application/json',
    'Cache-Control': 'no-cache',
    Expires: '0',
};

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
    timeout: 60000,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;