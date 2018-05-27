import { authHeader, config } from '../helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  getLoggedUser,
  update,
  delete: _delete,
  changePassword
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ grantType: 'password', username, password })
  };

  return fetch(config.apiUrl + '/api/auth', requestOptions)
    .then(handleResponse, handleError)
    .then(user => {
      if(user && user.accessToken) {
        localStorage.setItem('user',JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api', requestOptions)
    .then(handleResponse, handleError);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/' + id, requestOptions)
    .then(handleResponse, handleError);
}

function getLoggedUser() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/getLoggedUser', requestOptions)
    .then(handleResponse, handleError);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };

  return fetch(config.apiUrl + '/api/register', requestOptions)
    .then(handleResponse, handleError);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };

  return fetch(config.apiUrl + '/api/' + user.id, requestOptions)
    .then(handleResponse, handleError);
}

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/' + id, requestOptions)
    .then(handleResponse, handleError);
}

function changePassword(data) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };

  return fetch(config.apiUrl + '/api/changePassword', requestOptions)
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
