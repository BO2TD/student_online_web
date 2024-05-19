import {post} from "../request";


export function ahomework(data) {
    // alert('ppppp')
    return post('/api/study/homework/list', data)
}
export function deleteHomewor(data) {
    // alert('ppppp')
    return post('/api/study/homework/delete', data)
}