const isDevelopmentMode = () => {
  return process.env.NODE_ENV !== 'production';
};

module.exports = {
  isDevelopmentMode,
};
