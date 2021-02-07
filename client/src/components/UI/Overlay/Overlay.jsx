import React, { useEffect } from "react";
import classes from "./Overlay.scss";
import { connect, useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

const Overlay = (props) => {
  const { showOverlay } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.dataset.noscroll = showOverlay;
  }, [showOverlay]);

  const removeOverlay = () => {
    dispatch({ type: actionTypes.OVERLAY_TOGGLE, payload: false });
  };

  return (
    <div
      className={classes.overlay}
      data-role="overlay"
      data-show={showOverlay}
      onClick={() => removeOverlay()}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    showOverlay: state.promotions.showOverlay,
  };
};

export default connect(mapStateToProps)(Overlay);
