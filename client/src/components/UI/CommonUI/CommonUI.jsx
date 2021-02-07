import React from "react";
import { connect } from "react-redux";
import Alert from "./Alert/Alert";
import PromotionModal from "../../PromotionModal/PromotionModal";
import Overlay from "../Overlay/Overlay";

const CommonUI = (props) => {
  const { error, showModal, showOverlay } = props;

  return (
    <>
      {showOverlay && <Overlay />}
      {showModal && <PromotionModal />}
      {error && error.message && <Alert message={error.message} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.error,
    showOverlay: state.promotions.showOverlay,
    showModal: state.promotions.showModal,
  };
};

export default connect(mapStateToProps)(CommonUI);
