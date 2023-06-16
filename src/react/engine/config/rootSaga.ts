// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';
// Engine
import clustersWatcher from '../core/clusters/saga/wathcer';

export function* rootSaga(): SagaIterator {
  yield all([
    call(clustersWatcher),
  ]);
}
