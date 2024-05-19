import {post} from "../request";

export function tho(data) {
    return post('api/study/homework/list',data)

}
export function deletHomework(data) {
    return post('api/study/homework/delete',data)

}
export function listDoHomework(data) {
    return post('api/study/userdohomework/list',data)

}
export function listNotDoHomework(data) {
    return post('api/study/user/findNotDoHomework',data)

}