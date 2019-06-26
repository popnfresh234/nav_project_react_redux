import { SET_NAV_POSITION } from './navActions';


const initialState = {
  navPos: 0,
};

function navReducer( state = initialState, action ) {
  const lookup = {
    SET_NAV_POSITION: () => ( {
      ...state,
      navPos: action.navPos,
    } ),
  };

  const fn = lookup[action.type];
  if ( fn ) {
    return fn();
  }
  return state;
}

export default navReducer;
