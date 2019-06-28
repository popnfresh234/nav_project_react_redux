import { combineReducers } from 'redux';
import navReducer from './navReducer.js';
import authReducer from './authReducer.js';
import recipeReducer from './recipesReducer.js';

export default combineReducers( {
  navState: navReducer,
  authState: authReducer,
  recipesState: recipeReducer,
} );
