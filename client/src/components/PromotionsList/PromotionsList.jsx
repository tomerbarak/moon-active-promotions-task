import React, { useEffect, useState, useRef } from "react";
import classes from "./PromotionsList.scss";
import { getPromotions } from "../../store/actions";
import PromotionsTable from "./PromotionsTable/PromotionsTable";
import PromotionsActions from "./PromotionsActions/PromotionsActions";
import { debounce } from "../../utils/helpers";
import { connect } from "react-redux";
import { ACTIONS_TYPE } from "../../utils/constants";

const PromotionsList = (props) => {
  const { updatedPromotion } = props;
  const [promotionsList, setPromotionsList] = useState([]);
  const [promotionsToShow, setPromotionsToShow] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const tableRef = useRef(null);
  const threshold = 30;

  const triggerLoadMore = () =>
    debounce(async () => {
      const element = tableRef.current;
      if (!element) return;
      if (element.scrollTop + 700 > element.scrollHeight) {
        setPage(page !== 0 && page <= maxPage ? page - 1 : page + 1);
      } else if (element.scrollHeight - element.scrollTop > 2300) {
        setPage(page <= 1 ? 1 : page - 1);
      }
    }, 50);

  const loadMorePromotions = async () => {
    let newPromotionsList = promotionsList;
    if (lastPage <= page) {
      setLastPage(page);
      const morePromotions = await getPromotions([`page=${page}`]);
      if (morePromotions.length > 0) {
        newPromotionsList = [...promotionsList, ...morePromotions];
        setPromotionsList(newPromotionsList);
      } else if (morePromotions.length < threshold) {
        setMaxPage(page);
      }
    }
    const startingPage = page * threshold - threshold;
    const offsetPage = page * threshold + threshold;
    setPromotionsToShow(newPromotionsList.slice(startingPage, offsetPage));
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

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <PromotionsActions page={page} />
        {promotionsToShow.length > 0 && (
          <>
            <h3 className={classes.header}>List of awesome promotions:</h3>
            <PromotionsTable
              promotionsList={promotionsToShow}
              threshold={threshold}
              page={page}
              tableRef={tableRef}
              onScrollEvent={triggerLoadMore()}
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.error,
    updatedPromotion: state.promotions.updatedPromotion,
  };
};

export default connect(mapStateToProps)(PromotionsList);
