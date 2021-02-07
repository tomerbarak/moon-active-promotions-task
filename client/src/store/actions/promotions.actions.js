import PromotionsService from "../../services/promotions/promotions.service";

export const getPromotions = async (params) => {
  try {
    return await PromotionsService.getPromotions(params);
  } catch (error) {
    throw error;
  }
};

export const createPromotions = async (amount) => {
  try {
    return await PromotionsService.createPromotions(amount);
  } catch (error) {
    throw error;
  }
};

export const deletePromotionById = async (id) => {
  try {
    return await PromotionsService.deletePromotionById(id);
  } catch (error) {
    throw error;
  }
};

export const duplicatePromotionById = async (id) => {
  try {
    return await PromotionsService.duplicatePromotionById(id);
  } catch (error) {
    throw error;
  }
};

export const editPromotionNameById = async (id, name) => {
  try {
    return await PromotionsService.editPromotionNameById(id, name);
  } catch (error) {
    throw error;
  }
};
