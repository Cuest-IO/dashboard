// Core
import { takeEvery } from 'redux-saga/effects';
// Parts
import callGetClustersWorker from './workers/callGetClustersWorker';
import { clustersAsyncActions } from './asyncActions';

export default function* clustersWatcher() {
  yield takeEvery(clustersAsyncActions.getClustersAsync.type, callGetClustersWorker);
}
