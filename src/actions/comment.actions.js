import { commentConstants } from '../constants';
import { commentService } from '../services';

export const commentActions = {
    getAll,
    addComment,
    updateComment,
    deleteComment
};

function getAll(beerId) {
  return dispatch => {
    dispatch(request());

    commentService.getAll(beerId)
      .then(
        comments => dispatch(success(comments)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: commentConstants.GETALL_REQUEST}}
  function success(comments) {return {type: commentConstants.GETALL_SUCCESS, comments}}
  function failure(error) {return {type: commentConstants.GETALL_FAILURE, error}}
}

function addComment(comment, beerId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    commentService.addComment(comment, beerId)
      .then(
        comment => {
          dispatch(success(comment))
          resolve(comment);
        },
        error => {
          dispatch(failure(error));
          reject();
          //dispatch(alertActions.error(error))
        }
        );
    });
  };

  function request() {return {type: commentConstants.ADD_COMMENT_REQUEST}}
  function success(comment) {return {type: commentConstants.ADD_COMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.ADD_COMMENT_FAILURE, error}}
}

function updateComment(comment, beerId, commentId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(comment));

    commentService.updateComment(comment, beerId, commentId)
      .then(
        comment => {
          dispatch(success(comment));
          resolve(comment);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request() {return {type: commentConstants.UPDATEPOSTCOMMENT_REQUEST}}
  function success(comment) {return {type: commentConstants.UPDATEPOSTCOMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.UPDATEPOSTCOMMENT_FAILURE, error}}
}

function deleteComment(beerId, commentId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    commentService.deleteComment(beerId, commentId)
      .then(
        comment => {
          dispatch(success(comment));
          resolve(comment);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request() {return {type: commentConstants.DELETE_COMMENT_REQUEST}}
  function success(comment) {return {type: commentConstants.DELETE_COMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.DELETE_COMMENT_FAILURE, error}}
}