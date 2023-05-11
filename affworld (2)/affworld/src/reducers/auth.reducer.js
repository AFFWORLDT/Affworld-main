/* eslint-disable import/no-anonymous-default-export */
import { authConstants, signupConstants } from "../actions/constants";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
    case authConstants.LOGOUT_REQUEST:
    case signupConstants.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case authConstants.LOGIN_SUCCESS:
    case signupConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGOUT_FAILURE:
    case signupConstants.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case authConstants.SET_ERROR_REQUEST:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// const initState = {
//     token: null,
//     user: {
//         _id: "" ,
//         firstName: "",
//         lastName: "",
//         fullName: "",
//         email: "",
//         user_name: "",
//         contact: "",
//         blogs: "",
//         role: "",
//         funFact: "",
//         followers: [],
//         followings: [],
//         socialLinks: ""
//     },
//     error: null,
//     authenticating: false,
//     authenticate: false,
//     message: '',
//     loading: '',
//     success: false
// }

// export default (state = initState, action) => {
//     console.log(action)
//     switch(action.type) {
//         case signupConstants.SIGNUP_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//         break;

//         case signupConstants.SIGNUP_SUCCESS:
//             state = {
//                 ...state,
//                 loading: false,
//                 message: action.payload.message
//             }
//         break;

//         case signupConstants.SIGNUP_FAILURE:
//             state = {
//                 ...state,
//                 loading: false,
//                 error: action.payload.error
//             }
//         break;

//         case authConstants.LOGIN_REQUEST:
//           state = {
//               ...state,
//               authenticating: true,
//               loading: true
//           }
//         break;

//         case authConstants.LOGIN_SUCCESS:
//             state = {
//                 ...state,
//                 token: action.payload.token,
//                 user: action.payload.user,
//                 authenticating: false,
//                 authenticate: true,
//                 loading: false,
//             }
//         break;

//         case authConstants.LOGIN_FAILURE:
//             state = {
//                 ...state,
//                 authenticating: false,
//                 error: action.payload.error,
//                 loading: false
//             }
//         break;

//         case authConstants.LOGOUT_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//         break;

//         case authConstants.LOGOUT_SUCCESS:
//             state = {
//                 ...initState,
//                 loading: false,
//                 success: true
//             }
//         break;

//         case authConstants.LOGOUT_FAILURE:
//             state = {
//                 ...state,
//                 loading: false,
//                 error: action.payload.message
//             }
//         break;

//         default: return state;
//     }

//     return state;
// }
