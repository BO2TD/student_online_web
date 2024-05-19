import {post} from "./request";

export function listKnow(data) {
    return post('api/study/knowledgePoint/list',data)

}
export function deleteKnow(data) {
    return post('api/study/knowledgePoint/delete ',data)

}
export function personal(data) {
    return post('api/study/user/info',data)

}


export function password(data) {
    return post('api/study/user/updatePassword',data)

}