import {
  
       GET_SELECTED_NEWS_START,
    GET_SELECTED_NEWS_SUCCESS,
    GET_SELECTED_NEWS_ERROR,
     } from "../actions/types";
     
     const initialState = {
       newsData: null,
       newsDataError: null,
       newsDataLoading: true,
      
     };
     
     const SelectedNewsDataReducer = (state = initialState, action) => {
       switch (action.type) {
         case GET_SELECTED_NEWS_START:
           return {
             ...state,
             newsDataLoading: true
           };
         case GET_SELECTED_NEWS_SUCCESS:
           return {
             ...state,
             newsData: action.payload,
             newsDataError: null,
             newsDataLoading: false
           };
         case GET_SELECTED_NEWS_ERROR:
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
     
     export default SelectedNewsDataReducer;
     