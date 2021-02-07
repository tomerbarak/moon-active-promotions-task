import React from "react";
import classes from "./PromotionsActions.scss";
import { createPromotions } from "../../../store/actions";
import * as actionTypes from "../../../store/actionTypes";
import { connect, useDispatch } from "react-redux";

const PromotionsActions = (props) => {
  const { page, isLoading } = props;
  const dispatch = useDispatch();

  const generatePromotions = async (amount) => {
    try {
      dispatch({
        type: actionTypes.GENERATE_PROMOTIONS_START,
      });
      const response = await createPromotions(amount);
      if (response) {
        dispatch({
          type: actionTypes.GENERATE_PROMOTIONS_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.GENERATE_PROMOTIONS_FAILED,
      });
    }
  };

  return (
    <div className={classes.actions}>
      <button
        disabled={isLoading}
        className={classes.generate}
        onClick={() => generatePromotions(10000)}
      >
        Generate 10,000 Promotions
      </button>
      <div className={classes.page}>Max Page: {page}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
  };
};

export default connect(mapStateToProps)(PromotionsActions);
