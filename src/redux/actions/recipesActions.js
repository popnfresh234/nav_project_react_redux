export const FETCH_RECIPES_LOADING = 'FETCH_RECIPES_LOADING';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_REJECTED = 'FETCH_RECIPES_REJECTED';
export const SET_VOTED = 'SET_VOTED';

export function recipesLoading() {
  return { type: FETCH_RECIPES_LOADING };
}

export function recipesSuccess( recipes ) {
  return { type: FETCH_RECIPES_SUCCESS, payload: recipes };
}

export function recipesRejected( errorMessage ) {
  return { type: FETCH_RECIPES_REJECTED, payload: errorMessage };
}

export function setVoted( voted ) {
  return { type: SET_VOTED, payload: voted };
}
