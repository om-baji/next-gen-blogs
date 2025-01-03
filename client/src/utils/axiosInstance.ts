import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_API}/api/v1`,
    timeout : 10000,
    withCredentials : true,
    headers : {
        "Content-Type" : "application/json"
    },
    timeoutErrorMessage : "Request timeout!"
})