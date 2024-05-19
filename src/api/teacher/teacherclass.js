import {post} from "../request";


export function tclassmanagemt(data) {
    // alert('ppppp')
    return post('/api/study/userClass/list', data)
}
export function deleteStudent(data) {
    // alert('ppppp')
    return post('/api/study/userClass/delete', data)
}
