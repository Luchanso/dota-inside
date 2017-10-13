import { API } from './constants';

export const fetchHeroes = () =>
  fetch(`${API}/api/heroStats`)
    .then(response => response.json());

export default {
  fetchHeroes,
};
