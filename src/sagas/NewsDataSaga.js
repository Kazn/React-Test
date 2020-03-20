import { put, call, takeEvery } from "redux-saga/effects";
import * as NewsAction from "../actions/NewsAction";
import * as NewsAPIInterface from "../Apis/NewsApi";

import {
    GET_TOP_NEWS,
  } from "../actions/types";

  export default function* watchNewsDataSaga() {
    //WATCHER SAGA
    yield takeEvery(GET_TOP_NEWS, getNewsData);
  
  }

  function* getNewsData(action) {
    //WORKER SAGA
    if(action.newsType=='1'){
    yield put(NewsAction.requestNewsDataStart());
    }else{
      yield put(NewsAction.requestSelectedNewsDataStart());
    }
    try {
      const responseData = yield call(
        NewsAPIInterface.getNews,
        action.keyWord
      );
      const response = responseData.data;

      if(response.status=="ok"){
        if(action.newsType=='1'){
        yield put(NewsAction.requestNewsDataSuccess(response));
        }else{
          yield put(NewsAction.requestSelectedNewsDataSuccess(response));

        }

      }else{
        if(action.newsType=='1'){
        yield put(NewsAction.requestNewsDataError(response));
        }else{
          yield put(NewsAction.requestSelectedNewsDataSuccess(response));

        }
      }
    } catch (error) {
      console.log(error);
      if(action.newsType=='1'){
        yield put(NewsAction.requestNewsDataError(error));
      }else{
        yield put(NewsAction.requestSelectedNewsDataError(error));

        }
    }
  }