import {
    GET_TOP_NEWS,
    GET_TOP_NEWS_START,
    GET_TOP_NEWS_SUCCESS,
    GET_TOP_NEWS_ERROR,
    GET_SELECTED_NEWS_START,
    GET_SELECTED_NEWS_SUCCESS,
    GET_SELECTED_NEWS_ERROR,
  } from "./types";
  
  export const requestNewsData = (keyWord,newsType) => {
    return {
      type: GET_TOP_NEWS,
      keyWord: keyWord,
      newsType:newsType
    };
  };
  
  export const requestNewsDataStart = () => {
    return {
      type: GET_TOP_NEWS_START,
      loading: true
    };
  };
  
  export const requestNewsDataSuccess = data => {
    return {
      type: GET_TOP_NEWS_SUCCESS,
      payload: data,
      loading: false
    };
  };
  
  export const requestNewsDataError = error => {
    return {
      type: GET_TOP_NEWS_ERROR,
      loading: false,
      payload: error
    };
  };

  export const requestSelectedNewsDataStart = () => {
    return {
      type: GET_SELECTED_NEWS_START,
      loading: true
    };
  };
  
  export const requestSelectedNewsDataSuccess = data => {
    return {
      type: GET_SELECTED_NEWS_SUCCESS,
      payload: data,
      loading: false
    };
  };
  
  export const requestSelectedNewsDataError = error => {
    return {
      type: GET_SELECTED_NEWS_ERROR,
      loading: false,
      payload: error
    };
  };