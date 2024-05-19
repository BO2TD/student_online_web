import axios from "axios";

// 创建axios实例



const service = axios.create({
    timeout: 30000 // 请求超时时间
})
//添加request拦截器
// service.interceptors.request.use(config => {
//     let token = document.cookie
//     if (token) {
//         config.headers.token = token;
//     }
//     return config;
// }, error => {
//     Promise.reject(error)
// })
// 添加respone拦截器
service.interceptors.response.use(
    response => {
        // 未登录或会话已过期
        // if (1009 == response.data.code) {
        //     console.log(response.data.code,'token');
        //     //this.$router.push("/login");
        //     window.location.href="login";
        //     // 重定向到登录页
        //     router.replace({
        //         path: '/login',
        //         query: {redirect: router.currentRoute.fullPath}
        //     }
        //     )
        // }
        return response;
    },
    error => {
        if (500 === error.response.status) {
            // 服务端异常
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

export function get(url,params) {
    //params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return service({
        url:url,
        method: 'get',
        headers: {
        },
         params
    })
}


//封装post请求
export function post(url, data) {
    //默认配置
    let sendObject={
        url:url,
        method: 'post',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data:data
    };
    sendObject.data=JSON.stringify(data);
    return service(sendObject)
}


//封装put方法 (resfulAPI常用)
export function put(url,data){
    return service({
        url: url,
        method: 'put',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data:JSON.stringify(data)
    })
}
//删除方法(resfulAPI常用)
export function deletes(url,data){
    return service({
        url: url,
        method: 'delete',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data:JSON.stringify(data)
    })
}

//不要忘记export
export {
    service
}