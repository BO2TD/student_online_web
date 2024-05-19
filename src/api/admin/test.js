import {post} from "../request";


export function testpoint(data) {
    // alert('ppppp')
    return post('/api/study/exercises/list', data)
}

export function deleteTest(data) {
    // alert('ppppp')
    return post('/api/study/exercises/delete', data)
}



