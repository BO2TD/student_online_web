import {post} from "../request";


export function smanamgent(data) {
    // alert('ppppp')
    return post('/api/study/class/list', data)
}

export function addClass(data) {
    return post('/api/study/applicant/save',data)

}

export function detailhistory(data) {
    console.log(data)
    return post('/api/study/applicant/list',data)
}

export function isFlage(data) {
    return post('/api/study/applicant/joinTrueOrFalse',data)

}

