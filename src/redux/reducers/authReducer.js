import {
  AUTH_DATA, SET_LOGGED_IN,
  FETCH_USER_PROFILE_LOADING,
  FETCH_USER_PROFILE_REJECTED,
  FETCH_USER_PROFILE_SUCCESS,
} from '../actions/authActions';


const initialState = {
  profile: {},
  authData: {},
  loggedIn: false,
  loading: false,
  rejected: false,
  errorMessage: '',
};

function authReducer( state = initialState, action ) {
  const lookup = {
    [AUTH_DATA]: () => ( {
      ...state,
      authData: action.payload,
    } ),
    [SET_LOGGED_IN]: () => ( {
      ...state,
      loggedIn: action.payload,
    } ),
    [FETCH_USER_PROFILE_SUCCESS]: () => ( {
      ...state,
      profile: action.payload,
      loading: false,
      rejected: false,
    } ),
    [FETCH_USER_PROFILE_LOADING]: () => ( {
      ...state,
      loading: true,
      rejected: false,
    } ),
    [FETCH_USER_PROFILE_REJECTED]: () => ( {
      ...state,
      rejected: true,
      loading: false,
      errorMessage: action.payload,
    } ),
  };

  const fn = lookup[action.type];
  if ( fn ) {
    return fn();
  }
  return state;
}

export default authReducer;
