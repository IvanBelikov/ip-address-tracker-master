import axios, { AxiosInstance } from 'axios'

export const ipApi: AxiosInstance = axios.create({
    baseURL: process.env.IP_API_URL,
})
