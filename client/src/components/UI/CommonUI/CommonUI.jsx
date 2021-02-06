import React from "react";
import { connect } from "react-redux";
import Alert from "./Alert/Alert";

const CommonUI = (props) => {
  const { error } = props;

  return (
    <>
      {/*<Overlay />*/}
      {error && error.message && <Alert message={error.message} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.error,
  };
};

export default connect(mapStateToProps)(CommonUI);
