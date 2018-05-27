import { breweryConstants } from '../constants';

const initialState = {
    loadingBreweries: false,
    addingBrewery: false,
    breweries: [],
    brewery: [],
    error: []
}

export function breweries(state = initialState, action) {
  switch (action.type) {
      case breweryConstants.GETALL_REQUEST:
        return {
            loadingBreweries: true
        };
      case breweryConstants.GETALL_SUCCESS:
        return {
            breweries: action.breweries
        };
      case breweryConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
      case breweryConstants.ADD_BREWERY_REQUEST:
        return {
            addingBrewery: true
        };
      case breweryConstants.ADD_BREWERY_SUCCESS:
        return {
            brewery: action.brewery
        };
      case breweryConstants.ADD_BREWERY_FAILURE:
        return {
            error: action.error
        };
      default:
        return state
  }}