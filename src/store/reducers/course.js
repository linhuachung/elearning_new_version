import {TYPES} from '@/store/actions'

const INIT_STATE = {
    list_course_categories: [],
    list_course: [],
    list_categories: [],
    course_by_categories: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LIST_COURSE_BY_CATEGORIES_SUCCESS":
            return {
                ...state,
                list_course_categories: action.data
            }
        case "GET_LIST_COURSE_SUCCESS":
            return {
                ...state,
                list_course: action.data
            }
        case "LIST_CATEGORIES_SUCCESS":
            return {
                ...state,
                list_categories: action.data
            }
        case "GET_COURSE_BY_CATEGORIES_SUCCESS":
            return {
                ...state,
                course_by_categories: action.data
            }
        default:
            return state
    }
}
