import { all, fork} from 'redux-saga/effects';
import  watchNewsDataSaga  from './NewsDataSaga';

export default function* rootSaga () {
  yield all([
    fork(watchNewsDataSaga),
  ]);
}