import { beerRatingConstants } from '../constants';
import { beerRatingService } from '../services';

export const beerRatingActions = {
    getBeerRating,
    getBeerRatingForUser,
    addBeerRating,
    updateBeerRating
};

function getBeerRating(beerId) {
  return dispatch => {
    dispatch(request());

    beerRatingService.getBeerRating(beerId)
      .then(
        beerRating => dispatch(success(beerRating)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerRatingConstants.GET_BEER_RATING_REQUEST}}
  function success(beerRating) {return {type: beerRatingConstants.GET_BEER_RATING_SUCCESS, beerRating}}
  function failure(error) {return {type: beerRatingConstants.GET_BEER_RATING_FAILURE, error}}
}

function getBeerRatingForUser(beerId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    beerRatingService.getBeerRatingForUser(beerId)
      .then(
        beerRating => {
            dispatch(success(beerRating))
            resolve(beerRating);
        },
        error => {
          dispatch(failure(error));
          reject(error);
         }
        );
    });
  };

  function request() {return {type: beerRatingConstants.GET_BEER_RATING_FOR_USER_REQUEST}}
  function success(beerRating) {return {type: beerRatingConstants.GET_BEER_RATING_FOR_USER_SUCCESS, beerRating}}
  function failure(error) {return {type: beerRatingConstants.GET_BEER_RATING_FOR_USER_FAILURE, error}}
}

function addBeerRating(beerRating, beerId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    beerRatingService.addBeerRating(beerRating, beerId)
      .then(
        beerRating => {
          dispatch(success(beerRating))
          resolve(beerRating);
        },
        error => {
          dispatch(failure(error));
          reject(error);
          //dispatch(alertActions.error(error))
        }
        );
    });
  };

  function request() {return {type: beerRatingConstants.ADD_BEER_RATING_REQUEST}}
  function success(beerRating) {return {type: beerRatingConstants.ADD_BEER_RATING_SUCCESS, beerRating}}
  function failure(error) {return {type: beerRatingConstants.ADD_BEER_RATING_FAILURE, error}}
}

function updateBeerRating(beerRating, ratingId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    beerRatingService.updateBeerRating(beerRating, ratingId)
      .then(
        beerRating => {
          dispatch(success(beerRating));
          resolve(beerRating);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request() {return {type: beerRatingConstants.UPDATE_BEER_RATING_REQUEST}}
  function success(beerRating) {return {type: beerRatingConstants.UPDATE_BEER_RATING_SUCCESS, beerRating}}
  function failure(error) {return {type: beerRatingConstants.UPDATE_BEER_RATING_FAILURE, error}}
}