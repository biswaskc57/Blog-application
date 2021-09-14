/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import loginServices from "../services/login";
import storage from "../utils/storage";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      state = action.data;
      return state;
    case "LOGOUT":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  console.log(username, password);
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password });
      console.log(user);
      dispatch({ type: "LOGIN", data: user });
      storage.saveUser(user);
      blogService.setToken(user.token);
      dispatch(setNotification("welcome to the blog app", 5000));
    } catch (error) {
      dispatch(setNotification("wrong username or password", 5000));
    }
  };
};
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT", data: null });
    dispatch(setNotification("logged out", 5000));
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    storage.saveUser(user);
    if (user !== null) {
      blogService.setToken(user.token);
    }
    await dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};
export default userReducer;
