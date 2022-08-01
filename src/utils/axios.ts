import axios, { AxiosRequestHeaders } from "axios";


const MODE = import.meta.env.MODE  // 环境变量

axios.defaults.baseURL = MODE === 'development' ? 'http://127.0.0.1:7001' : 'http://8.130.17.206'
axios.defaults.withCredentials = true
axios.defaults.headers.head['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 拦截器用于拦截每一次请求，对数据做一些“装饰”再 return 回去
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        alert('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.code !== 200) {
        res.data.msg && alert(res.data.msg)
        if (res.data.code === 401) {
            // 未登录则跳转到登录页面
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios


export const baseUrl: string = MODE === 'development' ? 'http://127.0.0.1:7001' : 'http://8.130.17.206:7001'

export const imgUrlTrans = (url: string) => {
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = `${baseUrl}${url}`
        return url
    }
}