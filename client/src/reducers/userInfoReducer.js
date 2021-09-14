/* eslint-disable indent */
import userServices from "../services/user";

const userInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL USERS":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll();
    dispatch({ type: "INITIAL USERS", data: users });
    console.log(users);
  };
};
export default userInfoReducer;
