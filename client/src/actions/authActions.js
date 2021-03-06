import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentuser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentuser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove the token from LS
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  setAuthToken(false);
  //set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentuser({}));
};
