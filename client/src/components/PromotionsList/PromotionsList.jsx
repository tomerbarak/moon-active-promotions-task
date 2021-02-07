import React, { useEffect, useState } from "react";
import classes from "./PromotionsList.scss";
import { getPromotions } from "../../store/actions";
import PromotionsTable from "./PromotionsTable/PromotionsTable";
import PromotionsActions from "./PromotionsActions/PromotionsActions";
import { debounce } from "../../utils/helpers";
import { connect, useDispatch } from "react-redux";
import { ACTIONS_TYPE } from "../../utils/constants";
import { Spinner } from "../UI/Spinner/Spinner";
import * as actionTypes from "../../store/actionTypes";

const PromotionsList = (props) => {
  const dispatch = useDispatch();
  const { newPromotionsList, updatedPromotion, isLoading } = props;
  const [promotionsList, setPromotionsList] = useState([]);
  const [page, setPage] = useState(0);
  const threshold = 50;
  const fetchOffset = 700;
  const itemHeight = 40;

  const triggerLoadMore = (e) => {
    if (e.scrollOffset > (page + 1) * threshold * itemHeight - fetchOffset) {
      setPage(page + 1);
    }
  };

  const loadMorePromotions = async () => {
    try {
      dispatch({
        type: actionTypes.GET_PROMOTIONS_START,
      });
      const morePromotions = await getPromotions([`page=${page}`]);
      if (morePromotions.length > 0) {
        setPromotionsList([...promotionsList, ...morePromotions]);
      }
      dispatch({
        type: actionTypes.GET_PROMOTIONS_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.GET_PROMOTIONS_FAILED,
      });
    }
  };

  const updatePromotionsList = (updatedPromotion) => {
    let updatedPromotionsList;
    const updatedObj = updatedPromotion.promotion;
    if (updatedPromotion.type === ACTIONS_TYPE.DELETE) {
      updatedPromotionsList = promotionsList.filter(
        (promotion) => promotion.id !== updatedObj.id
      );
    } else if (updatedPromotion.type === ACTIONS_TYPE.DUPLICATE) {
      promotionsList.splice(
        promotionsList.findIndex((p) => p.name === updatedObj.name),
        0,
        updatedObj
      );
    } else if (updatedPromotion.type === ACTIONS_TYPE.EDIT) {
      promotionsList[
        promotionsList.findIndex((p) => p.id === updatedObj.id)
      ] = updatedObj;
    }
    setPromotionsList(updatedPromotionsList || [...promotionsList]);
  };

  useEffect(() => {
    loadMorePromotions();
  }, [page]);

  useEffect(() => {
    if (!updatedPromotion || !updatedPromotion.type) return;
    updatePromotionsList(updatedPromotion);
  }, [updatedPromotion]);

  useEffect(() => {
    setPromotionsList([...promotionsList, ...newPromotionsList]);
  }, [newPromotionsList]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <PromotionsActions page={page} />
        {promotionsList.length > 0 && (
          <>
            <h3 className={classes.header}>List of awesome promotions:</h3>
            {isLoading && <Spinner />}
            <PromotionsTable
              promotionsList={promotionsList}
              itemHeight={itemHeight}
              onScrollEvent={debounce(triggerLoadMore, 50)}
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
    isLoading: state.promotions.isLoading,
    updatedPromotion: state.promotions.updatedPromotion,
    newPromotionsList: state.promotions.newPromotionsList,
  };
};

export default connect(mapStateToProps)(PromotionsList);
