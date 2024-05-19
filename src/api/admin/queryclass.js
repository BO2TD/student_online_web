import {post} from "../request";


export function quclass(data) {
    // alert('ppppp')
    return post('/api/study/class/findList',data)
}
export function pclass(data) {
    // alert('ppppp')
    return post('/api/study/userClass/findList',data)
}
// export function queryClass(data) {
//     // alert('ppppp')
//     return post('/api/study/userClass/findList',data)
// }
