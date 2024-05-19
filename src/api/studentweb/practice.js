import {post} from "../request";

export function practices(data) {
    return post('api/study/exercises/findNotDoExercises ',data)

}