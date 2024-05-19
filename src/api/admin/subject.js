import {post} from "../request";


export function listSubject(data) {
    // alert('ppppp')
    return post('/api/study/subject/findPage', data)
}

export function updateSubject(data) {
    // alert('ppppp')
    return post('/api/study/subject/update', data)
}
export function saveSubject(data) {
    // alert('ppppp')
    return post('/api/study/subject/save', data)
}
export function deleteSubject(data) {
    // alert('ppppp')
    return post('/api/study/subject/delete', data)
}