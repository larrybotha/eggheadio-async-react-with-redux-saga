export const FETCH_STAR_WARS_REQUEST = 'FETCH_STAR_WARS_REQUEST';
export const fetchStarWarsRequest = () => ({
  type: FETCH_STAR_WARS_REQUEST,
});

export const FETCH_STAR_WARS_SUCCESS = 'FETCH_STAR_WARS_SUCCESS';
export const fetchStarWarsSuccess = data => ({
  type: FETCH_STAR_WARS_SUCCESS,
  data,
});

export const QUEUE_CHANNEL_REQUESTS = 'QUEUE_CHANNEL_REQUESTS';
export const queueChannelRequests = () => ({
  type: QUEUE_CHANNEL_REQUESTS,
});
