import {post} from "./request";

export function listAllNotice(data) {
    return post('api/tab-notice/noticeAll',data)

}