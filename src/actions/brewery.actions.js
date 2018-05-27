import { breweryConstants } from '../constants';
import { breweryService } from '../services';

export const breweryActions = {
    getAll,
    addBrewery
};

function getAll() {
  return dispatch => {
    dispatch(request());

    breweryService.getAll()
      .then(
        breweries => dispatch(success(breweries)),
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error))
        }
      );
  };

  function request() {return {type: breweryConstants.GETALL_REQUEST}}
  function success(breweries) {return {type: breweryConstants.GETALL_SUCCESS, breweries}}
  function failure(error) {return {type: breweryConstants.GETALL_FAILURE, error}}
}

function addBrewery(brewery) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    breweryService.addBrewery(brewery)
      .then(
        brewery => {
          dispatch(success(brewery))
          resolve(brewery);
        },
        error => {
          dispatch(failure(error));
          reject();
          //dispatch(alertActions.error(error))
        }
        );
    });
  };

  function request() {return {type: breweryConstants.ADD_BREWERY_REQUEST}}
  function success(brewery) {return {type: breweryConstants.ADD_BREWERY_SUCCESS, brewery}}
  function failure(error) {return {type: breweryConstants.ADD_BREWERY_FAILURE, error}}
}