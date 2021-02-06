export const addParameterToURL = (url, param) => {
  url += (url.split("?")[1] ? "&" : "?") + param;
  return url;
};

export const debounce = (func, wait) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getFormattedStringDate = (date) => {
  return new Date(date).toLocaleDateString();
};
