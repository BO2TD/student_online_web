import {post,get} from "./request";

export function listStudents(data) {
    return post('api/tab-user/listAllStudent',data)

}

export function listUser(data) {
    return get('api/tab-user/personalInfo',data)

}