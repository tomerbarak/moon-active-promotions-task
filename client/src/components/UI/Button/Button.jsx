import React from 'react';
import classes from './Button.scss';
import PropTypes from 'prop-types';

const Button = props => {
  const { onClick, color, size, disabled, title } = props;
  return (
    <button
      type="button"
      className={[classes.btn, classes[color], classes[size]].join(' ')}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string
};

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  disabled: false
};

export default Button;
