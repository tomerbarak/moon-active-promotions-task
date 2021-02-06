function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name + '=' + (value || '') + expires + '; path=/' + (window.location.host === 'localhost:3000' ? '' : '; Secure');
}

const getCookie = name => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = name => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const setUserToStorage = data => {
  const stringData = JSON.stringify(data);
  setCookie('USER_INFO', stringData, 90);
};

export const getUserFromStorage = () => {
  const stringData = getCookie('USER_INFO');
  return JSON.parse(stringData);
};

export const removeUserFromStorage = () => {
  eraseCookie('USER_INFO');
};
