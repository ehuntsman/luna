import * as userlogin from './userService';

const GET_USER = 'GET_USER';

const initialState = {
  loggedIn: {},
  loading: false
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER + "_PENDING":
      return Object.assign({}, state, {loading: true})
    case GET_USER + "_FULFILLED":
      return Object.assign({}, state, {loading: false, loggedIn: action.payload})
    default:
      return state
  }
}

export function getUserInfo() {
  return {
    type: GET_USER,
    payload: userlogin.getUserInfo()
  }
}