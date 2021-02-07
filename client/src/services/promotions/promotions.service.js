import HttpService from "../http/basic/http.service";
import { addParameterToURL } from "../../utils/helpers";

export default class PromotionsService {
  static getPromotions(params) {
    let url = "/getPromotions";
    if (params && params.length > 0) {
      params.forEach((param) => {
        url = addParameterToURL(url, param);
      });
    }

    return HttpService.get(url)
      .then((promotions) => Promise.resolve(promotions))
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  static createPromotions(payload) {
    return HttpService.post("/createPromotions", {}, payload).then(
      (promotions) => {
        return Promise.resolve(promotions);
      }
    );
  }

  static deletePromotionById(id) {
    // todo: validate is admin
    return HttpService.delete(`/deletePromotion/${id}`).then(
      (updatedPromotion) => {
        return Promise.resolve(updatedPromotion);
      }
    );
  }

  static duplicatePromotionById(id) {
    // todo: validate is admin
    return HttpService.post(`/duplicatePromotion/${id}`).then(
      (duplicatedPromotion) => {
        return Promise.resolve(duplicatedPromotion);
      }
    );
  }
  static editPromotionNameById(id, name) {
    // todo: validate is admin
    return HttpService.put(`/editPromotionName/${id}`, null, {
      name: name,
    }).then((editedPromotion) => {
      return Promise.resolve(editedPromotion);
    });
  }
}
