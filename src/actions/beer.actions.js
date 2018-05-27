import { beerConstants } from '../constants';
import { beerService } from '../services';

export const beerActions = {
    getAll,
    getBest,
    getOne,
    addBeer,
    uploadPhoto,
    getBeersAddedByUser
};

function getAll() {
  return dispatch => {
    dispatch(request());

    beerService.getAll()
      .then(
        beers => dispatch(success(beers)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerConstants.GETALL_REQUEST}}
  function success(beers) {return {type: beerConstants.GETALL_SUCCESS, beers}}
  function failure(error) {return {type: beerConstants.GETALL_FAILURE, error}}
}

function getBest() {
  return dispatch => {
    dispatch(request());

    beerService.getBest()
      .then(
        beers => dispatch(success(beers)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerConstants.GET_BEST_REQUEST}}
  function success(beers) {return {type: beerConstants.GET_BEST_SUCCESS, beers}}
  function failure(error) {return {type: beerConstants.GET_BEST_FAILURE, error}}
}

function getBeersAddedByUser() {
  return dispatch => {
    dispatch(request());

    beerService.getBeersAddedByUser()
      .then(
        beers => dispatch(success(beers)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerConstants.GET_BEERS_ADDED_BY_USER_REQUEST}}
  function success(beers) {return {type: beerConstants.GET_BEERS_ADDED_BY_USER_SUCCESS, beers}}
  function failure(error) {return {type: beerConstants.GET_BEERS_ADDED_BY_USER_FAILURE, error}}
}

function getOne(id) {
  return dispatch => {
    dispatch(request());

    beerService.getOne(id)
      .then(
        beer => dispatch(success(beer)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerConstants.GETONE_REQUEST}}
  function success(beer) {return {type: beerConstants.GETONE_SUCCESS, beer}}
  function failure(error) {return {type: beerConstants.GETONE_FAILURE, error}}
}

function addBeer(beer) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    beerService.addBeer(beer)
      .then(
        beer => {
            dispatch(success(beer));
            resolve(beer);
        },
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
          reject(error);
        }
        );
    });
  };

  function request() {return {type: beerConstants.ADD_BEER_REQUEST}}
  function success(beer) {return {type: beerConstants.ADD_BEER_SUCCESS, beer}}
  function failure(error) {return {type: beerConstants.ADD_BEER_FAILURE, error}}
}

function uploadPhoto(photo, id) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(photo));

    beerService.uploadPhoto(photo, id)
      .then(
        photo => {
          dispatch(success(photo));
          resolve();
        },
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error));
          reject(error);
        }
        );
    });
  };

  function request(photo) {return {type: beerConstants.UPLOADPHOTO_REQUEST, photo}}
  function success(photo) {return {type: beerConstants.UPLOADPHOTO_SUCCESS, photo}}
  function failure(error) {return {type: beerConstants.UPLOADPHOTO_FAILURE, error}}
}
