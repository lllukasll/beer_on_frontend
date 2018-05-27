import { beerRatingConstants } from '../constants';

const initialState = {
    loadingRating: false,
    loadingRatingForUser: false,
    loadedRatingForUser: false,
    addingRating: false,
    updatingRating: false,
    beerRating: [],
    beerRatingForUser: [],
    error: [],
}

export function beerRating(state = initialState, action) {
  switch (action.type) {
      case beerRatingConstants.GET_BEER_RATING_REQUEST:
        return {
            loadingRating: true
        };
      case beerRatingConstants.GET_BEER_RATING_SUCCESS:
        return {
            beerRating: action.beerRating
        };
      case beerRatingConstants.GET_BEER_RATING_FAILURE:
        return {
            error: action.error
        };
      case beerRatingConstants.GET_BEER_RATING_FOR_USER_REQUEST:
        return {
            ...state,
            loadingRatingForUser: true
        };
      case beerRatingConstants.GET_BEER_RATING_FOR_USER_SUCCESS:
        return {
            ...state,
            loadedRatingForUser: true,
            beerRatingForUser: action.beerRating
        };
      case beerRatingConstants.GET_BEER_RATING_FOR_USER_FAILURE:
        return {
            ...state,
            error: action.error
        };
      case beerRatingConstants.ADD_BEER_RATING_REQUEST:
        return {
            ...state,
            addingRating: true
        };
      case beerRatingConstants.ADD_BEER_RATING_SUCCESS:
        return {
            ...state,
            beerRating: action.beerRating
        };
      case beerRatingConstants.ADD_BEER_RATING_FAILURE:
        return {
            ...state,
            error: action.error
        };
      case beerRatingConstants.UPDATE_BEER_RATING_REQUEST:
        return {
            ...state,
            updatingRating: true
        };
      case beerRatingConstants.UPDATE_BEER_RATING_SUCCESS:
        return {
            ...state,
        };
      case beerRatingConstants.UPDATE_BEER_RATING_FAILURE:
        return {
            ...state,
            error: action.error
        };
      default:
        return state
  }}