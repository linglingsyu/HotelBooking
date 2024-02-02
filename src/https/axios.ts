import axios from "axios";

const config = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    }
  }
  
  const API = axios.create(config)
  
  API.interceptors.request.use(
    function (config) {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)FreyjaToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // Do something before request is sent
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  
  export { API }