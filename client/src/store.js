import notificationReducer from "./reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import userInfoReducer from "./reducers/userInfoReducer";
const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  userList: userInfoReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log(store.getState());
