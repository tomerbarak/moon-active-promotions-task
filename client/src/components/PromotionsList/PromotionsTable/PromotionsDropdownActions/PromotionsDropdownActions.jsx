import React from "react";
import classes from "./PromotionsDropdownActions.scss";
import * as actionTypes from "../../../../store/actionTypes";
import {
  deletePromotionById,
  duplicatePromotionById,
} from "../../../../store/actions";
import { useDispatch } from "react-redux";

const PromotionsDropdownActions = ({ promotion = {} }) => {
  const dispatch = useDispatch();

  const EditPromotion = async (promotion) => {
    dispatch({
      type: actionTypes.TOGGLE_EDIT_PROMOTION_MODAL,
      payload: { promotion: promotion, showModal: true, showOverlay: true },
    });
  };

  const deletePromotion = async (promotionId) => {
    dispatch({
      type: actionTypes.DELETE_PROMOTION_START,
    });
    const deletedPromotion = await deletePromotionById(promotionId);
    if (deletedPromotion && deletedPromotion.archive) {
      dispatch({
        type: actionTypes.DELETE_PROMOTION_SUCCESS,
        payload: deletedPromotion,
      });
    } else {
      dispatch({
        type: actionTypes.DELETE_PROMOTION_FAILED,
      });
    }
  };

  const duplicatePromotion = async (promotionId) => {
    dispatch({
      type: actionTypes.DUPLICATE_PROMOTION_START,
    });
    const duplicatedPromotion = await duplicatePromotionById(promotionId);
    if (duplicatedPromotion && duplicatedPromotion.parentId) {
      dispatch({
        type: actionTypes.DUPLICATE_PROMOTION_SUCCESS,
        payload: duplicatedPromotion,
      });
    } else {
      dispatch({
        type: actionTypes.DUPLICATE_PROMOTION_FAILED,
      });
    }
  };

  return (
    <div className={classes.dropdown}>
      <div className={classes.text}>Choose</div>
      <ul className={classes.list}>
        <li onClick={() => EditPromotion(promotion)}>Edit</li>
        <li onClick={() => deletePromotion(promotion.id)}>Delete</li>
        <li onClick={() => duplicatePromotion(promotion.id)}>Duplicate</li>
      </ul>
    </div>
  );
};

export default PromotionsDropdownActions;
