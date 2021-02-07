import React, { useEffect, useState } from "react";
import classes from "./PromotionsList.scss";
import { getPromotions } from "../../store/actions";
import PromotionsTable from "./PromotionsTable/PromotionsTable";
import PromotionsActions from "./PromotionsActions/PromotionsActions";
import { debounce } from "../../utils/helpers";
import { connect } from "react-redux";
import { ACTIONS_TYPE } from "../../utils/constants";
import { Spinner } from "../UI/Spinner/Spinner";

const PromotionsList = (props) => {
  const { updatedPromotion, isLoading } = props;
  const [promotionsList, setPromotionsList] = useState([]);
  const [promotionsToShow, setPromotionsToShow] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const threshold = 50;
  const fetchOffset = 700;
  const itemHeight = 40;

  const triggerLoadMore = (e) => {
    // todo: debounce
    if (e.scrollOffset > (page + 1) * threshold * itemHeight - fetchOffset) {
      setPage(page + 1);
    }
  };

  const loadMorePromotions = async () => {
    let newPromotionsList = promotionsList;
    if (lastPage <= page) {
      setLastPage(page);
      const morePromotions = await getPromotions([`page=${page}`]);
      if (morePromotions.length > 0) {
        newPromotionsList = [...promotionsList, ...morePromotions];
        setPromotionsList(newPromotionsList);
      }
    }
    setPromotionsToShow(newPromotionsList);
  };

  const updatePromotionsList = (updatedPromotion) => {
    let updatedPromotionsList;
    let updatedPromotionsToShow;
    const updatedObj = updatedPromotion.promotion;
    if (updatedPromotion.type === ACTIONS_TYPE.DELETE) {
      updatedPromotionsList = promotionsList.filter(
        (promotion) => promotion.id !== updatedObj.id
      );
      updatedPromotionsToShow = promotionsToShow.filter(
        (promotion) => promotion.id !== updatedObj.id
      );
    } else if (updatedPromotion.type === ACTIONS_TYPE.DUPLICATE) {
      promotionsList.splice(
        promotionsList.findIndex((p) => p.name === updatedObj.name),
        0,
        updatedObj
      );
      promotionsToShow.splice(
        promotionsToShow.findIndex((p) => p.name === updatedObj.name),
        0,
        updatedObj
      );
    }
    setPromotionsList(updatedPromotionsList || promotionsList);
    setPromotionsToShow(updatedPromotionsToShow || promotionsToShow);
  };

  useEffect(() => {
    loadMorePromotions();
  }, [page]);

  useEffect(() => {
    if (!updatedPromotion || !updatedPromotion.type) return;
    updatePromotionsList(updatedPromotion);
  }, [updatedPromotion]);

  debugger;
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {isLoading && <Spinner />}
        <PromotionsActions page={page} />
        {promotionsToShow.length > 0 && (
          <>
            <h3 className={classes.header}>List of awesome promotions:</h3>
            <PromotionsTable
              promotionsList={promotionsToShow}
              itemHeight={itemHeight}
              onScrollEvent={triggerLoadMore}
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
    error: state.ui.error,
    updatedPromotion: state.promotions.updatedPromotion,
  };
};

export default connect(mapStateToProps)(PromotionsList);
