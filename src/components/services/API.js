import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrendMovies = async () => {
  const response = await axios.get(
    'trending/movie/week?api_key=1f0eb1feed9fa1ccad12b32d75df77ac'
  );
  return response.data;
};

export const getFilmCard = async id => {
  const response = await axios.get(
    `movie/${id}?api_key=1f0eb1feed9fa1ccad12b32d75df77ac`
  );
  return response.data;
};

export const getCast = async id => {
  const response = await axios.get(
    `movie/${id}/credits?api_key=1f0eb1feed9fa1ccad12b32d75df77ac`
  );
  return response.data;
};

export const getReviews = async id => {
  const response = await axios.get(
    `movie/${id}/reviews?api_key=1f0eb1feed9fa1ccad12b32d75df77ac`
  );
  return response.data;
};

export const getSearchMovie = async query => {
  const response = await axios.get(
    `search/movie?api_key=1f0eb1feed9fa1ccad12b32d75df77ac&query=${query}`
  );
  return response.data;
};
