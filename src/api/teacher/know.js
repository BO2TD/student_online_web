import {post} from "../request";

export function know(data) {
    return post('api/study/knowledgePoint/list',data)

}