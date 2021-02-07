import * as actionTypes from "../actionTypes";
import { ACTIONS_TYPE } from "../../utils/constants";

const INITIAL_STATE = {
  updatedPromotion: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GENERATE_PROMOTIONS_START:
    case actionTypes.DUPLICATE_PROMOTION_START:
    case actionTypes.DELETE_PROMOTION_START:
      return { ...state, error: null, isLoading: true };
    case actionTypes.GENERATE_PROMOTIONS_FAILED:
    case actionTypes.DUPLICATE_PROMOTION_FAILED:
    case actionTypes.DELETE_PROMOTION_FAILED:
      return { ...state, error: payload, isLoading: false };
    case actionTypes.DUPLICATE_PROMOTION_SUCCESS:
      return {
        ...state,
        error: null,
        updatedPromotion: { type: ACTIONS_TYPE.DUPLICATE, promotion: payload },
        isLoading: false,
      };
    case actionTypes.DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        error: null,
        updatedPromotion: { type: ACTIONS_TYPE.DELETE, promotion: payload },
        isLoading: false,
      };
    case actionTypes.GENERATE_PROMOTIONS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
