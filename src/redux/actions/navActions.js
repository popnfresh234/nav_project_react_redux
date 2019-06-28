/* eslint-disable import/prefer-default-export */
export const SET_NAV_POSITION = 'SET_NAV_POSITION';

export const setNavPosition = ( ( navPath ) => {
  const lookup = {
    '/home': () => 0,
    '/profile': () => 1,
    '/private': () => 2,
    '/info': () => 3,
  };

  const fn = lookup[navPath];
  let navPos = 0;
  if ( fn ) navPos = fn();
  return {
    type: SET_NAV_POSITION,
    navPos,
  };
} );
