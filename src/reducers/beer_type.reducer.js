import { beerTypeConstants } from '../constants';

const initialState = {
    loadingBeerTypes: false,
    addingBeerType: false,
    beerTypes: [],
    beerType: [],
    error: []
}

export function beerTypes(state = initialState, action) {
  switch (action.type) {
      case beerTypeConstants.GETALL_REQUEST:
        return {
            loadingBeerTypes: true
        };
      case beerTypeConstants.GETALL_SUCCESS:
        return {
            beerTypes: action.beerTypes
        };
      case beerTypeConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
      case beerTypeConstants.ADD_BEERTYPE_REQUEST:
        return {
            addingBeerType: true
        };
      case beerTypeConstants.ADD_BEERTYPE_SUCCESS:
        return {
            beerType: action.beerType
        };
      case beerTypeConstants.ADD_BEERTYPE_FAILURE:
        return {
            error: action.error
        };
      default:
        return state
  }}