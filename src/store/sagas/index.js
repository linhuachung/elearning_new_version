import { all } from 'redux-saga/effects'

import account from './account'
import course from './course'
export default function* sagas() {
  yield all([
    account(),
    course()
  ])
}
