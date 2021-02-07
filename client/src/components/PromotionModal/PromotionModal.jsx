import React, { useState } from "react";
import classes from "./PromotionModal.scss";
import { connect, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import CloseButton from "../UI/CloseButton/CloseButton";
import { editPromotionNameById } from "../../store/actions";

const PromotionModal = (props) => {
  const { showModal, editedPromotion } = props;
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState(editedPromotion.name);

  const closeModal = () => {
    dispatch({
      type: actionTypes.TOGGLE_EDIT_PROMOTION_MODAL,
      payload: { show: false, promotion: {} },
    });
    document.body.dataset.noscroll = "false";
  };

  const editPromotion = async (id, name) => {
    dispatch({
      type: actionTypes.EDIT_PROMOTION_START,
    });
    const editedPromotion = await editPromotionNameById(id, name);
    if (editedPromotion && editedPromotion.id) {
      dispatch({
        type: actionTypes.EDIT_PROMOTION_SUCCESS,
        payload: editedPromotion,
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_PROMOTION_FAILED,
      });
    }
  };

  return (
    <div className={classes.modal} data-show={showModal}>
      <span className={classes.close}>
        <CloseButton closeMethod={() => closeModal()} title="close" />
      </span>
      <form className={classes.form}>
        <label className={classes.label} htmlFor="name">
          Edit Promotion Name:
        </label>
        <input
          className={classes.name}
          type="text"
          name="name"
          id="name"
          defaultValue={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <button
          type="button"
          disabled={!nameValue}
          className={classes.button}
          onClick={() => editPromotion(editedPromotion._id, nameValue)}
        >
          Edit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showModal: state.promotions.showModal,
    editedPromotion: state.promotions.editedPromotion,
  };
};

export default connect(mapStateToProps)(PromotionModal);
