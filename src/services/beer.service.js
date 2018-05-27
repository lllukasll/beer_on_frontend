import { authHeader, config } from '../helpers';

export const beerService = {
  getAll,
  getBest,
  getOne,
  addBeer,
  uploadPhoto,
  getBeersAddedByUser
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer', requestOptions)
    .then(handleResponse, handleError);
}

function getBest() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/best', requestOptions)
    .then(handleResponse, handleError);
}

function getBeersAddedByUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/user', requestOptions)
    .then(handleResponse, handleError);
}

function getOne(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/' + id, requestOptions)
    .then(handleResponse, handleError);
}


function addBeer(beer) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(beer)
  };

  return fetch(config.apiUrl + '/api/beer', requestOptions)
    .then(handleResponse, handleError);
}

function uploadPhoto(photo, id) {
  const formData = new FormData();
        formData.append('file', photo);

  const requestOptions = {
    method: 'POST',
    headers: {...authHeader()},
    body: formData
  };
  return fetch(config.apiUrl + '/api/beer/' + id + '/photo', requestOptions)
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
