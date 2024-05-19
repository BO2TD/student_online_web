import {post} from "../request";

export function work(data) {
    return post('/api/study/homework/findNotDoHomework',data)

}
export function workdo(data) {
    return post('api/study/userdohomework/list',data)

}