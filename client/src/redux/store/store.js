import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";

console.log(rootReducer);

export const store = createStore(rootReducer, applyMiddleware(thunk));
