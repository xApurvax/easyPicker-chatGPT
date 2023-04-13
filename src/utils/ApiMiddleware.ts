import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken } from './helper'
import Cookies from 'js-cookie'

const ApiMiddleware = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
})

ApiMiddleware.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Accept = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
)

ApiMiddleware.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.status === 401) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
    }
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
    }
    return Promise.reject(error)
  }
)

export default ApiMiddleware
