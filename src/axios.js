import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use((config) => { //on evry request check and add info about token
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export default instance