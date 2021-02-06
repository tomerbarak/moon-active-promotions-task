import React from "react";
import classes from "./PromotionsTable.scss";
import { getFormattedStringDate } from "../../../utils/helpers";
import {
  deletePromotionById,
  duplicatePromotionById,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

const PromotionsTable = (props) => {
  const dispatch = useDispatch();
  const {
    promotionsList = [],
    threshold = 30,
    page = 0,
    tableRef = null,
    onScrollEvent,
  } = props;

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
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>User Group Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody ref={tableRef} onScroll={onScrollEvent}>
        {promotionsList.map((promotion, index) => {
          const top =
            50 * index + 50 * threshold * (page <= 1 ? 0 : page - 1) + "px";
          return (
            <tr key={promotion.id} style={{ top }}>
              <td>{promotion.name}</td>
              <td>{promotion.type}</td>
              <td>{getFormattedStringDate(promotion.start_date)}</td>
              <td>{getFormattedStringDate(promotion.end_date)}</td>
              <td>{promotion.user_group_name}</td>
              <td className={classes.dropdown}>
                <div className={classes.text}>Choose</div>
                <ul className={classes.list}>
                  <li>Edit</li>
                  <li onClick={() => deletePromotion(promotion.id)}>Delete</li>
                  <li onClick={() => duplicatePromotion(promotion.id)}>
                    Duplicate
                  </li>
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PromotionsTable;
