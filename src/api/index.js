import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081'; // 增加默认的请求路径
axios.interceptors.response.use(function (res) {
    return res.data;
})// 在这里统一拦截结果，把结果处理成res.data,如果数据有errmsg错误，也可以统一在这儿处理

// 获取轮播图数据
export let getSliders = () => {
    //返回的是一个promise对象
    return axios.get('/sliders')
}

// 获取热门图书
export let getHotBook = () => {
    return axios.get('/hot')
}

// 获取全部图书
export let getBooks = () => axios.get('/book');

// 删除某一本图书
export let removeBook = (id) => axios.delete(`/book?id=${id}`);

// 获取某一本图书
export let findOneBook = (id) => axios.get(`/book?id=${id}`);

// 修改某一本图书
export let updateBook = (id, data) => axios.put(`/book?id=${id}`, data);

// 添加图书
export let addBook = (data) => axios.post(`/book`, data);


export let getAll = ()=>{
    return axios.all([getSliders(), getHotBook()]);
}

//根据偏移量返回对应的数据
export let pagination = (offset)=>{
    return axios.get(`/page?offset=${offset}`)
}