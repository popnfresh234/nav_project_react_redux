import { SET_NAV_PATH } from '../actions/navActions';


const initialState = {
  navPath: '/home',
};

function navReducer( state = initialState, action ) {
  const lookup = {
    [SET_NAV_PATH]: () => ( {
      ...state,
      navPath: action.navPath,
    } ),
  };


  const fn = lookup[action.type];
  if ( fn ) {
    return fn();
  }
  return state;
}

export default navReducer;
