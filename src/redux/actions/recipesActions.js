export const FETCH_RECIPES_LOADING = 'FETCH_RECIPES_LOADING';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_REJECTED = 'FETCH_RECIPES_REJECTED';


export function recipesLoading() {
  return { type: FETCH_RECIPES_LOADING };
}

export function recipesSuccess( recipes ) {
  return { type: FETCH_RECIPES_SUCCESS, payload: recipes };
}

export function recipesRejected() {
  return { type: FETCH_RECIPES_REJECTED };
}
