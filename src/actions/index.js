export const FETCH_STAR_WARS_REQUEST = 'FETCH_STAR_WARS_REQUEST';
export const fetchStarWarsRequest = () => ({
  type: FETCH_STAR_WARS_REQUEST,
});

export const FETCH_STAR_WARS_SUCCESS = 'FETCH_STAR_WARS_SUCCESS';
export const fetchStarWarsSuccess = data => ({
  type: FETCH_STAR_WARS_SUCCESS,
  data,
});

export const STOP_BACKGROUND_FETCH = 'STOP_BACKGROUND_FETCH';
