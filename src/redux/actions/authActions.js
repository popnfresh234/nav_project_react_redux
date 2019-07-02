export const FETCH_USER_PROFILE_LOADING = 'FETCH_USER_PROFILE_LOADING';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_REJECTED = 'FETCH_USER_PROFILE_REJECTED';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const AUTH_DATA = 'SET_AUTH_DATA';


export function userProfileLoading() {
  return { type: FETCH_USER_PROFILE_LOADING };
}

export function userProfileSuccess( profile ) {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: profile,
  };
}

export function userProfileRejected( err ) {
  return { type: FETCH_USER_PROFILE_REJECTED, payload: err };
}

export function setLoggedIn( loggedIn ) {
  return { type: SET_LOGGED_IN, payload: loggedIn };
}

export function setAuthData( authData ) {
  return { type: AUTH_DATA, payload: authData };
}
