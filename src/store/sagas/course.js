import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import {
    listCourseByCategories,
    listCategories
} from "@/api/course";

export default function* watcher() {
    yield all([
        takeLatest(TYPES.LIST_COURSE_BY_CATEGORIES, sagaHelper({
            api: listCourseByCategories
        })),
        takeLatest(TYPES.LIST_CATEGORIES, sagaHelper({
            api: listCategories
        }))
    ])
}
