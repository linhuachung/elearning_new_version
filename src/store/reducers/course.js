import { TYPES } from '@/store/actions'

const INIT_STATE = {
 list_course_categories:[],
    list_categories:[]
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
      case "LIST_COURSE_BY_CATEGORIES_SUCCESS":
          return {
              ...state,
              list_course_categories: action.data
          }
      case "LIST_CATEGORIES_SUCCESS":
          return {
              ...state,
              list_categories: action.data
          }
    default:
      return state
  }
}