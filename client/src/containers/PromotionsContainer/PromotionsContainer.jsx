import React from "react";
import classes from "./PromotionsContainer.scss";
import PromotionsList from "../../components/PromotionsList/PromotionsList";

const PromotionsContainer = () => {
  return (
    <div className={classes.app}>
      <div className={classes.content}>
        <PromotionsList />
      </div>
    </div>
  );
};

export default PromotionsContainer;
