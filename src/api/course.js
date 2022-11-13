import {MainApi} from './endpoint'

export function listCourseByCategories(payload) {
    return MainApi.get(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`)
}

export function getListCourse(payload) {
    return MainApi.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc`, payload)
}

export function listCategories(payload) {
    return MainApi.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`)
}
