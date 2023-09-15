import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

let middlewares = [reduxThunk, reduxPromise];
let env = process.env.NODE_ENV;

if (env === "development") {
  middlewares.push(reduxLogger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
