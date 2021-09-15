import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTHENTICATE,
} from "actionTypes/actionTypes";
import AuthService from "_services/auth.services";
export const login = (userData) => (dispatch) => {
  return AuthService.login(userData)
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject();
    });
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  return dispatch({
    type: LOGOUT,
  });
};
export const authenticate = () => (dispatch) => {
  return AuthService.authenticate()
    .then((data) => {
      dispatch({
        type: AUTHENTICATE,
        payload: data,
      });
      return Promise.resolve();
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAIL,
      });
      return Promise.reject();
    });
};
