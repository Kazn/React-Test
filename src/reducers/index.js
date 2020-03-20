import { combineReducers } from 'redux';
import NewsDataReducer from "./NewsDataReducer";
import SelectedNewsDataReducer from "./SelectedNewsDataReducer";

const rootReducer = combineReducers({
  NewsDataReducer,
  SelectedNewsDataReducer
  
});
export default rootReducer;