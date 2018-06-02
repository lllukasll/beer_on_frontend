import { userConstants } from '../constants';
import jwt_decode from 'jwt-decode';

const loggedUserInitialState = {
    loading: false,
    loadedUser: false,
    loggedUserData: [],
    error: []
}

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken) {
      var decoded = jwt_decode(user.accessToken);

      if(decoded.role === 'Admin')
      {
          return true
      }
          
      return false;
  } else {
      return false;
  }
}

export function loggedUser(state = loggedUserInitialState, action) {
  switch (action.type) {
    case userConstants.GETLOGGEDUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETLOGGEDUSER_SUCCESS:
      return {
        userIsAdmin: authHeader(),
        loadedUser: true,
        loggedUserData: action.user
      };
    case userConstants.GETLOGGEDUSER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        userData: action.user
      };
    case userConstants.GETUSER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}

const changePasswordInitialState = {
    loadingChangePassword: false,

}

export function changePassword(state = changePasswordInitialState, action) {
  switch (action.type) {
    case userConstants.CHANGEPASSWORD_REQUEST:
      return {
        loadingChangePassword: true
      };
    case userConstants.CHANGEPASSWORD_SUCCESS:
      return {
        message: action.message
      };
    case userConstants.CHANGEPASSWORD_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}
