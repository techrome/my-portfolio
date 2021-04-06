import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

import { isdev } from "@/config";

import rootReducer from "./reducers";

const bindMiddleware = (middleware) => {
  if (isdev) {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
  const store = createStore(rootReducer, bindMiddleware([]));

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: isdev });
