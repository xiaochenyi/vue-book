import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081'; // 增加默认的请求路径

// 获取轮播图数据
export let getSliders = () => {
    return axios.get('/sliders')
}