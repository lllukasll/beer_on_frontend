import { authHeader, config } from '../helpers';

export const beerRatingService = {
  getBeerRating,
  getBeerRatingForUser,
  addBeerRating,
  updateBeerRating
};

function getBeerRating(beerId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/rating', requestOptions)
    .then(handleResponse, handleError);
}

function getBeerRatingForUser(beerId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/rating/user', requestOptions)
    .then(handleResponse, handleError);
}

function addBeerRating(beerRating, beerId) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(beerRating)
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/rating', requestOptions)
    .then(handleResponse, handleError);
}

function updateBeerRating(beerRating, ratingId) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(beerRating)
  };
  return fetch(config.apiUrl + '/api/beerRating/' + ratingId, requestOptions)
    .then(handleResponse, handleError);
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        response.json().then(json => resolve(json));
      } else {
        resolve();
      }
    } else {
      response.text().then(text => reject(text));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}