import {
 GET_TOP_NEWS_SUCCESS,
    GET_TOP_NEWS_START,
    GET_TOP_NEWS_ERROR
  
  } from "../actions/types";
  
  const initialState = {
    newsData: null,
    newsDataError: null,
    newsDataLoading: true,
   
  };
  
  const NewsDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TOP_NEWS_START:
        return {
          ...state,
          newsDataLoading: true
        };
      case GET_TOP_NEWS_SUCCESS:
        return {
          ...state,
          newsData: action.payload,
          newsDataError: null,
          newsDataLoading: false
        };
      case GET_TOP_NEWS_ERROR:
        return {
          ...state,
          newsData: null,
          newsDataError: action.payload,
          newsDataLoading: false
        };
  
      default:
        return state;
    }
  };
  
  export default NewsDataReducer;
  