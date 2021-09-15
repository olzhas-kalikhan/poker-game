import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTHENTICATE,
} from "actionTypes/actionTypes";
import io from "_services/socket.services";

const initialState = {
  isAuthenticated: false,
  user: {},
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        socket: io({
          query: {
            userID: payload.user._id,
          },
        }),
        gameList: payload.gameList,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
