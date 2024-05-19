import {post} from "../request";

export function videos(data) {
    return post('/api/study/videos/selectByVideoTotalId',data)

}
export function deleteVideo(data) {
    return post('/api/study/videos/delete',data)

}
export function askandanswer(data) {
    return post('/api/study/askQuestions/save',data)
}

export function videoHistory(data) {
    return post('api/study/userVideo/student/list',data)

}
