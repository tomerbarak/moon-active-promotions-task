import React from 'react';
import classes from './CloseButton.scss';

const CloseButton = props => {
  const { closeMethod = f => f, index, src, title } = props;

  return (
    <button
      className={classes.close_button}
      data-role="button-close"
      onClick={closeMethod}
      data-index={index}
      data-src={src}
      type="button"
      title={title}
    />
  );
};

export default CloseButton;
