import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import uiReducer from "./ui.reducer";
import promotionsReducer from "./promotions.reducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    promotions: promotionsReducer,
  });
