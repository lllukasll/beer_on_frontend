import { beerConstants } from '../constants';

const initialState = {
    addingBeer: false,
    uploadingPhoto: false,
    uploadedPhoto: false,
    loadingBeers: false,
    loadingBestBeers: false,
    loadingUserBeers: false,
    loadingBeer: false,
    beer: [],
    beers: [],
    bestBeers: [],
    userBeers: [],
    error: []
}

export function beer(state = initialState, action) {
  switch (action.type) {
      case beerConstants.GETALL_REQUEST:
        return {
            loadingBeers: true
        };
      case beerConstants.GETALL_SUCCESS:
        return {
            beers: action.beers
        };
      case beerConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
      case beerConstants.GET_BEST_REQUEST:
        return {
            loadingBestBeers: true
        };
      case beerConstants.GET_BEST_SUCCESS:
        return {
            bestBeers: action.beers
        };
      case beerConstants.GET_BEST_FAILURE:
        return {
            error: action.error
        };
      case beerConstants.GET_BEERS_ADDED_BY_USER_REQUEST:
        return {
            loadingUserBeers: true
        };
      case beerConstants.GET_BEERS_ADDED_BY_USER_SUCCESS:
        return {
            userBeers: action.beers
        };
      case beerConstants.GET_BEERS_ADDED_BY_USER_SUCCESS:
        return {
            error: action.error
        };
      case beerConstants.GETONE_REQUEST:
        return {
            loadingBeer: true
        };
      case beerConstants.GETONE_SUCCESS:
        return {
            beer: action.beer
        };
      case beerConstants.GETONE_FAILURE:
        return {
            error: action.error
        };
      case beerConstants.ADD_BEER_REQUEST:
        return {
            addingBeer: true
        };
      case beerConstants.ADD_BEER_SUCCESS:
        return {
            beer: action.beer
        };
      case beerConstants.ADD_BEER_FAILURE:
        return {
            error: action.error
        };
      case beerConstants.UPLOADPHOTO_REQUEST:
        return { 
            uploadingPhoto: true 
        };
      case beerConstants.UPLOADPHOTO_SUCCESS:
        return {
            uploadedPhoto:true
        };
      case beerConstants.UPLOADPHOTO_FAILURE:
        return {
            error: action.error
        };
      default:
        return state
  }}