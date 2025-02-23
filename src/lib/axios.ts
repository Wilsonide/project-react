import axios from 'axios'
const baseURL = 'https://boring-anny-wilsonide-708b7cef.koyeb.app'

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