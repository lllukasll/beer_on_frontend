import { commentConstants } from '../constants';

const initialState = {
    loadingComments: false,
    addingComment: false,
    comments: [],
    comment: [],
    error: []
}

export function comments(state = initialState, action) {
  switch (action.type) {
      case commentConstants.GETALL_REQUEST:
        return {
            loadingComments: true
        };
      case commentConstants.GETALL_SUCCESS:
        return {
            comments: action.comments
        };
      case commentConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
      case commentConstants.ADD_COMMENT_REQUEST:
        return {
            ...state,
            addingComment: true
        };
      case commentConstants.ADD_COMMENT_SUCCESS:
        return {
            ...state,
            comment: action.comment
        };
      case commentConstants.ADD_COMMENT_FAILURE:
        return {
          ...state,
            error: action.error
        };
      default:
        return state
  }}