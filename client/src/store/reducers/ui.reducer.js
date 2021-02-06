import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  error: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return { ...state, isLoading: true };
    case actionTypes.LOADING_END:
      return { ...state, isLoading: false };
    case actionTypes.ERROR_PAGE:
      return {
        ...state,
        error: {
          showError: true,
          errorText: action.payload.message,
          errorStatus: action.payload.status,
        },
      };
    default:
      return state;
  }
};
