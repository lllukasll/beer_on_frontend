import { beerTypeConstants } from '../constants';
import { beerTypeService } from '../services';

export const beerTypeActions = {
    getAll,
    addBeerType
};

function getAll() {
  return dispatch => {
    dispatch(request());

    beerTypeService.getAll()
      .then(
        beerTypes => dispatch(success(beerTypes)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: beerTypeConstants.GETALL_REQUEST}}
  function success(beerTypes) {return {type: beerTypeConstants.GETALL_SUCCESS, beerTypes}}
  function failure(error) {return {type: beerTypeConstants.GETALL_FAILURE, error}}
}

function addBeerType(beerType) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    beerTypeService.addBeerType(beerType)
      .then(
        beerType => {
          dispatch(success(beerType))
          resolve(beerType);
        },
        error => {
          dispatch(failure(error));
          reject(error);
          //dispatch(alertActions.error(error))
        }
        );
    });
  };

  function request() {return {type: beerTypeConstants.ADD_BEERTYPE_REQUEST}}
  function success(beerType) {return {type: beerTypeConstants.ADD_BEERTYPE_SUCCESS, beerType}}
  function failure(error) {return {type: beerTypeConstants.ADD_BEERTYPE_FAILURE, error}}
}