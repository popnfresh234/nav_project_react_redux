import {
  FETCH_RECIPES_LOADING, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_REJECTED, SET_VOTED,
} from '../actions/recipesActions';

const initialState = {
  recipes: [],
  loading: false,
  rejected: false,
  errorMessage: '',
  voted: false,
};

function recipesReducer( state = initialState, action ) {
  const lookup = {
    [FETCH_RECIPES_SUCCESS]: () => ( {
      ...state,
      recipes: action.payload,
      loading: false,
      rejected: false,
    } ),
    [FETCH_RECIPES_LOADING]: () => ( {
      ...state,
      loading: true,
      rejected: false,
    } ),
    [FETCH_RECIPES_REJECTED]: () => ( {
      ...state,
      rejected: true,
      loading: false,
      errorMessage: action.payload,
    } ),
    [SET_VOTED]: () => ( {
      ...state,
      voted: action.payload,
    } ),
  };

  const fn = lookup[action.type];
  if ( fn ) {
    return fn();
  }
  return state;
}

export default recipesReducer;
