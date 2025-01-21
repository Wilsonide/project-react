import axios from 'axios'
const baseURL = 'http://localhost:3500';

export const Axios = axios.create({
    baseURL,
    withCredentials: true,
})

export const privateAxios = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true,
});