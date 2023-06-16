// Core
import { call, put } from 'redux-saga/effects';
// Engine
import { setListItems, setListLoading } from '../../slice';
import { api } from '../../../../config/axios';

export default function* callGetClustersWorker() {
  try {
    yield put(setListLoading(true));
    const { data } = yield call(api.devices.getClusters);
    yield put(setListItems(data));
    yield put(setListLoading(false));
  } catch (e) {
    console.warn(e);
  }
}
