import React from 'react';
import classes from './Alert.scss';
import CloseButton from '../../CloseButton/CloseButton';

const Alert = props => {
  const getCustomMessage = message => {
    switch (message) {
      case 'Cookies are not enabled in current environment.':
        return 'בכדי להתחבר יש צורך לאשר עוגיות בדפדפן שלך, לחצו על הסמל בצורה של ״עין״ או ״מנעול״ שמופיע על שורת הכתובות.';
      default:
        return message;
    }
  };

  if (document.getElementById('alert')) {
    document.getElementById('alert').style.display = 'flex';
  }

  return (
    <div id="alert" className={classes.alert}>
      <CloseButton closeMethod={() => (document.getElementById('alert').style.display = 'none')} />
      {getCustomMessage(props.message)}
    </div>
  );
};

export default Alert;
