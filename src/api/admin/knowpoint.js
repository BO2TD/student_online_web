import {post} from "../request";


export function konwpoint(data) {
    // alert('ppppp')
    return post('/api/study/knowledgePoint/list', data)
}
export function deletekonwpoint(data) {
    // alert('ppppp')
    return post('/api/study/knowledgePoint/delete', data)
}
