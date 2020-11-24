import { combineReducers } from 'redux';

const userID = localStorage.getItem('userID');

const initialAuthState = { loggedIn: false }
function auth(state = initialAuthState, action) {
  if(userID) {
    state.loggedIn = true;
  }
  switch(action.type) {

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      }

    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false
      }

    default:
      return state;
  }
}

const initialUserState = { username: '' }
function user(state = initialUserState, action) {
  switch(action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        username: action.username
      }

    case 'DELETE_USER':
      return {
        ...state,
        username: ''
      }
    default:
      return state;
  }
}

const MainReducer = combineReducers({
  auth,
  user
});

export default MainReducer;
