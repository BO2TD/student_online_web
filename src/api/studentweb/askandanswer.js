import {post} from "../request";

export function askandanswer(data) {
    return post('api/study/askQuestions/list',data)

}