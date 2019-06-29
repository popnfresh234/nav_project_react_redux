/* eslint-disable import/prefer-default-export */
export const SET_NAV_PATH = 'SET_NAV_PATH';

export const setNavPath = ( navPath => ( {
  type: SET_NAV_PATH,
  navPath,
} ) );
