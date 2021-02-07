import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  error: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
