import React from "react";
import classes from "./PromotionsActions.scss";
import { createPromotions } from "../../../store/actions";

const PromotionsActions = (props) => {
  const { page } = props;
  const generatePromotions = async (amount) => {
    try {
      await createPromotions(amount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.actions}>
      <button
        className={classes.generate}
        onClick={() => generatePromotions(100)}
      >
        Generate 10,000 Promotions
      </button>
      <div className={classes.page}>Fetched Page: {page}</div>
    </div>
  );
};

export default PromotionsActions;
