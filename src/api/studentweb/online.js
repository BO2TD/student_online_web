import {post} from "../request";

export function onlineweb(data) {
    return post('api/study/videoTotal/list',data)

}
export function onlinecourse(data) {
    return post('api/study/subject/queryList',data)

}

export function videoTotalHistory(data) {
    return post('api/study/userVideoTotal/student/list',data)
}
