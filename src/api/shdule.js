import {post} from "./request";

export function listAllShdule(data) {
    return post('/api/study/askQuestions/list',data)

}
export function addShdule(data) {
    return post('/api/study/askQuestions/update',data)

}