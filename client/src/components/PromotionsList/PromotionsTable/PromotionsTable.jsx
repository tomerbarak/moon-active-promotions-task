import React from "react";
import { FixedSizeList as List } from "react-window";

import classes from "./PromotionsTable.scss";
import * as actionTypes from "../../../store/actionTypes";
import { getFormattedStringDate } from "../../../utils/helpers";
import {
  deletePromotionById,
  duplicatePromotionById,
} from "../../../store/actions";
import { useDispatch } from "react-redux";

const PromotionsTable = (props) => {
  const dispatch = useDispatch();
  const { promotionsList = [], itemHeight = 40, onScrollEvent } = props;

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

  const Row = ({ index, promotion, style }) => (
    <div className={classes.tr} key={index + promotion.id} style={style}>
      <div className={classes.td}>{promotion.name}</div>
      <div className={classes.td}>{promotion.type}</div>
      <div className={classes.td}>
        {getFormattedStringDate(promotion.start_date)}
      </div>
      <div className={classes.td}>
        {getFormattedStringDate(promotion.end_date)}
      </div>
      <div className={classes.td}>{promotion.user_group_name}</div>
      <div className={classes.dropdown}>
        <div className={classes.text}>Choose</div>
        <ul className={classes.list}>
          <li>Edit</li>
          <li onClick={() => deletePromotion(promotion.id)}>Delete</li>
          <li onClick={() => duplicatePromotion(promotion.id)}>Duplicate</li>
        </ul>
      </div>
    </div>
  );

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
      <List
        className={classes.tbody}
        itemData={promotionsList}
        height={500}
        itemCount={promotionsList.length}
        onScroll={onScrollEvent}
        itemSize={itemHeight}
      >
        {(props) => {
          const promotion = props.data[props.index];
          return <Row {...props} promotion={promotion} />;
        }}
      </List>
    </table>
  );
};

export default PromotionsTable;
