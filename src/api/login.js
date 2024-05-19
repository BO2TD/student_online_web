
// let base_api = '127.0.0.1:9090'

import {post,get} from "./request";

export function loginRequest(data) {
    // alert('ppppp')
     return post('/api/study/user/login ', data)
}

export function outLoginRequest() {
     return get('api/tab-user/logout')

}

export function VerificationCode() {
     return get('api/tab-user/code')

}

export function register(data) {
     return post('api//study/user/registry',data)

}
