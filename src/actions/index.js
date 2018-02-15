export const FETCH_STAR_WARS_REQUEST = 'FETCH_STAR_WARS_REQUEST';
export const fetchStarWarsRequest = () => ({
  type: FETCH_STAR_WARS_REQUEST,
});

export const FETCH_STAR_WARS_SUCCESS = 'FETCH_STAR_WARS_SUCCESS';

export const CONFIRMATION = 'CONFIRMATION';
export const confirmFetchStarWars = () => ({
  type: CONFIRMATION,
});

export const FETCH_STAR_WARS_PLANETS_REQUEST =
  'FETCH_STAR_WARS_PLANETS_REQUEST';
export const starWarsPlanetsRequest = () => {
  return {
    type: FETCH_STAR_WARS_PLANETS_REQUEST,
  };
};

export const FETCH_STAR_WARS_PLANETS_SUCCESS =
  'FETCH_STAR_WARS_PLANETS_SUCCESS';
export const starWarsPlanetsSuccess = () => ({
  type: FETCH_STAR_WARS_PLANETS_SUCCESS,
});
