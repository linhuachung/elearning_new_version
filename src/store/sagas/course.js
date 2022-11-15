import {all, takeLatest} from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import {TYPES} from '@/store/actions'
import {
    listCourseByCategories,
    getListCourse,
    listCategories,
    getCourseByCategories
} from "@/api/course";

export default function* watcher() {
    yield all([
        takeLatest(TYPES.LIST_COURSE_BY_CATEGORIES, sagaHelper({
            api: listCourseByCategories
        })),
        takeLatest(TYPES.GET_LIST_COURSE, sagaHelper({
            api: getListCourse
        })),
        takeLatest(TYPES.LIST_CATEGORIES, sagaHelper({
            api: listCategories
        })),
        takeLatest(TYPES.GET_COURSE_BY_CATEGORIES, sagaHelper({
            api: getCourseByCategories
        }))
    ])
}
