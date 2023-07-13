import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./reducer/dataReducer";
import apiDataReducer from "./reducer/apiDataReducer";

const rootReducer = combineReducers({
  apiData: apiDataReducer,
  data: dataReducer,
});

export default rootReducer;
