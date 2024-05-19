import {post} from "./request";

export function listVideo(data) {
    return post('api/study/videoTotal/list',data)

}
export function savaVideo(data) {
    return post('api/study/videoTotal/save   ',data)

}
export function deleteVideos(data) {
    return post('api/study/videoTotal/delete  ',data)

}

export function saveUserVideoTotal(data) {
    return post('api/study/userVideoTotal/save  ',data)

}

export function saveUserVideo(data) {
    return post('api/study/userVideo/save  ',data)

}

export function videohistory(data) {
    return post('api/study/userVideoTotal/student/select',data)
}

export function videoHistoryTeacher(data) {
    return post('api/study/userVideo/teacher/select',data)
}

export function videoHistoryDeleteTeacher(data) {
    return post('api/study/userVideo/teacher/delete',data)
}

export function videoTotalHistoryDeleteTeacher(data) {
    return post('api/study/userVideoTotal/teacher/delete',data)
}
