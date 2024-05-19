import {post} from "./request";

export function listCourse(data) {
    return post('api/tab-course/listCourse',data)

}