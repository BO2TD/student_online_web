import {post,deletes,get} from "../request";


export function teacher(data) {
    // alert('ppppp')
    return post('/api/study/user/list', data)
}

export function deleteTeacher(data) {
    // alert('ppppp')
    return deletes('/api/study/user/delete', data)
}

export function listSubject() {
    // alert('ppppp')
    return get('/api/study/subject/findList')
}

export function updateSubject(data) {
    // alert('ppppp')
    return post('/api//study/user/update',data)
}