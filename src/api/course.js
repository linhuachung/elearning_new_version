import {MainApi} from './endpoint'

export function listCourseByCategories(payload) {
    return MainApi.get(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`)
}
export function listCategories(payload) {
    return MainApi.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`)
}
