import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 1000 * 30,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
      return config
  },
  (error) => {
      return Promise.reject(error)
  })

// response拦截器
service.interceptors.response.use(response => {
	console.log('response0000',response)
    return response
}, error => {
	console.log('error00000',error.response.data)
    return Promise.reject(error) 
})

export {service}