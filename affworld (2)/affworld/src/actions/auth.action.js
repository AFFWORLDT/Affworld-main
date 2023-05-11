import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { authConstants, signupConstants } from "./constants";
import { getDatabase, ref, set } from "firebase/database";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const userIdToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", userIdToken);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: userIdToken,
      });
      return userCredential;
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        error.message = "Incorrect Email Address! Please check again.";
      } else if (error.code === "auth/user-not-found") {
        error.message = "User does not exist! Please sign up.";
      } else if (error.code === "auth/wrong-password") {
        error.message = "Incorrect Password! Please check again";
      } else {
        error.message = "Something went wrong";
      }
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => async (dispatch) => {
  dispatch({ type: authConstants.LOGOUT_REQUEST });

  try {
    await signOut(firebaseAuth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: authConstants.LOGOUT_FAILURE, payload: error.message });
  }
};

export const signup = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: signupConstants.SIGNUP_REQUEST });

    try {
      // const auth = firebaseAuth();
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const userIdToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", userIdToken);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      dispatch({
        type: signupConstants.SIGNUP_SUCCESS,
        payload: userIdToken
      });
      return userCredential;
    } catch (error) {
      if (error.code === "auth/weak-password") {
        error.message =
          "Password should be more than 6 characters! Please check again.";
      } else {
        error.message = "Something went wrong";
      }
      dispatch({
        type: signupConstants.SIGNUP_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const isLoggedin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    }
  };
};

export const createUserProfile = async (userId, profileData) => {
  const db = getDatabase();
  const usersRef = ref(db, `users/${userId}`);
  await set(usersRef, profileData);
};

export function setError(error) {
  return {
    type: authConstants.SET_ERROR_REQUEST,
    payload: error,
  };
}

// import axios from '../helpers/axios'
// import { authConstants, signupConstants } from './constants'

// export const signup = (userData) => {
//     return dispatch => {
//         dispatch({ type: signupConstants.SIGNUP_REQUEST })
//         const res = axios.post('/signup', { ...userData })

//         res.then(response => {
//             dispatch({ type: signupConstants.SIGNUP_SUCCESS,
//                 payload: { message: response.data.message }
//             })
//         })

//         res.catch(error => {
//             dispatch({ type: signupConstants.SIGNUP_FAILURE,
//                 payload: { error: error.response.data.error  }
//             })
//         })
//     }
// }

// export const login = (user) => {
//     return dispatch => {
//         dispatch({ type: authConstants.LOGIN_REQUEST })
//         const res = axios.post('/signin', { ...user })

//         res.then(response => {
//             const { token, user } = response.data;
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));
//             dispatch({ type: authConstants.LOGIN_SUCCESS,
//                 payload: { token, user }
//             })
//         })

//         res.catch(error => {
//             dispatch({ type: authConstants.LOGIN_FAILURE,
//                 payload: { error: error.response.data.error }
//             })
//         })
//     }
// }

// export const isLoggedin = () => {
//     return dispatch => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const user = JSON.parse(localStorage.getItem("user"))

//             dispatch({
//                 type: authConstants.LOGIN_SUCCESS,
//                 payload: { token, user }
//             });
//         }
//     }
// }

// export const logout = () => {
//     return dispatch => {

//         dispatch({ type: authConstants.LOGOUT_REQUEST })
//         const res = axios.post(`/signout`)

//         res.then(response => {
//             if (response.status === 200) {
//                 localStorage.clear();
//                 dispatch({ type: authConstants.LOGOUT_SUCCESS })
//             }
//         })

//         res.catch((error) => {
//             if(error.response) {
//                 dispatch({
//                     type: authConstants.LOGOUT_FAILURE,
//                     payload: { error: error.response.data.error }
//                 })
//             }
//         })
//     }
// }
