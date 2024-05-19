import {post} from "./request";

export function listAllClass(data) {
    return post('api/tab-class/listClass',data)

}