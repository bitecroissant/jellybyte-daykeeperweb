import axios, { AxiosError, AxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:8787' : 'https://api.longislandicedteanight.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config
})

export { axiosInstance as ajax }

export const useAjax = () => {
  const onHttpError = (err: AxiosError) => {
    throw err
  }
  const cleanup = () => {
  }
  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any> | undefined) => {
      return axiosInstance.get<T>(path, config)
        .catch(onHttpError).finally(cleanup)
    },
    post: <T>(path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
      return axiosInstance.post<T>(path, data, config)
        .catch(onHttpError).finally(cleanup)
    },
    patch: <T>(path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
      return axiosInstance.patch<T>(path, data, config)
        .catch(onHttpError).finally(cleanup)
    },
    destory: <T>(path: string, config?: AxiosRequestConfig<any> | undefined) => {
      return axiosInstance.delete<T>(path, config)
        .catch(onHttpError).finally(cleanup)
    },
  }

  return ajax
}