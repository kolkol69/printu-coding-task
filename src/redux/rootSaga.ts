import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects'

import projectSagas from './project/saga'

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(projectSagas)])
}
