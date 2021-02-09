const promotionsType = ["basic", "common", "epic"];

const generateRandomPromotion = (promotionData, index) => {
  const {
    name,
    type,
    start_date,
    end_date,
    user_group_name,
    update_date,
  } = promotionData;
  return {
    name: name || index,
    type:
      type || promotionsType[Math.floor(Math.random() * promotionsType.length)],
    start_date: start_date || new Date(),
    end_date: end_date || new Date(),
    user_group_name: user_group_name || getRandomString(),
    update_date: update_date || new Date(), // todo: we can remove this
  };
};

const getRandomString = () => {
  return Math.random().toString(26).substr(2, 10);
};

module.exports = {
  generateRandomPromotion,
  promotionsType,
};
