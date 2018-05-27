import { authHeader, config } from '../helpers';

export const commentService = {
  getAll,
  addComment,
  updateComment,
  deleteComment
};

function getAll(beerId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/comment', requestOptions)
    .then(handleResponse, handleError);
}

function addComment(comment, beerId) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/comment', requestOptions)
    .then(handleResponse, handleError);
}

function updateComment(comment, beerId, commentId) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/comment/' + commentId, requestOptions)
    .then(handleResponse, handleError);
}

function deleteComment(beerId, commentId) {
  const requestOptions = {
    method: 'DELETE',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
  };

  return fetch(config.apiUrl + '/api/beer/' + beerId + '/comment/' + commentId, requestOptions)
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
