const url = 'https://swapi.co/api'

const api = endpoint => fetch([url, endpoint].join('')).then(res => res.json());

export default api;
