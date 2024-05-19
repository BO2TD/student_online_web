import {post} from "./request";

export function listAllScore(data) {
    return post('api/study/exercises/list',data)

}
export function listNotHomework(data) {
    return post('api/study/user/findNotDoWork',data)

}
export function listHomework(data) {
    return post('api/study/userDoExercise/list',data)

}
export function deletExercises(data) {
    return post('api/study/exercises/delete',data)

}