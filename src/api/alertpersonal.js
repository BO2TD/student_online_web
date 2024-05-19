import {post} from "./request";

export function listAllClass(data) {
    return post('api/study/user/update',data)

}