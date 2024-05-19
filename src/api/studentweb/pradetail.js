import {post} from "../request";

export function practicesde(data) {
    return post('api/study/userDoExercise/list ',data)

}