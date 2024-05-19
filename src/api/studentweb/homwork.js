

import {post} from "../request";

export function loginRequest(data) {
    // alert('ppppp')
    return post('/study/userdohomework/list', data)
}

export function outLoginRequest() {
    return get('api/tab-user/logout')

}

export function VerificationCode() {
    return get('api/tab-user/code')

}

export function doHomework(data) {
    return post('/api/study/userdohomework/save',data)

}
export function doExersize(data) {
    return post('/api/study/userDoExercise/save',data)

}
