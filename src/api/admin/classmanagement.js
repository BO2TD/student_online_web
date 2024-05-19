import {post} from "../request";


export function listClass(data) {
    // alert('ppppp')
    return post('/api/study/class/list ', data)
}
export function delteClass(data) {
    // alert('ppppp')
    return post('/api/study/class/delete', data)
}
export function listTeacher(data) {
    // alert('ppppp')
    return post('/api/study/user/findList', data)
}
export function saveClass(data) {
    // alert('ppppp')
    return post('/api/study/class/save', data)
}
export function updateClass(data) {
    // alert('ppppp')
    return post('/api/study/class/update ', data)
}