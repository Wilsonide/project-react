import axios from 'axios'
/* const baseURL = 'https://boring-anny-wilsonide-708b7cef.koyeb.app'; */
const baseURL = 'http://localhost:8000';

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