const HttpStatus = require("http-status-codes");
const Promotions = require("../models/promotions");
const { generateRandomPromotion } = require("../utils/promotions");

const handleError = (response, error) => {
  console.log("Error: " + error);
  response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
};

const getPromotions = (request, response) => {
  try {
    console.log("------ get promotions -----");
    let paramObj = {};
    let sortBy = "name";
    let limit = 30;
    let page = 0;
    if (request.query) {
      const params = new URLSearchParams(request.query);
      for (const param of params.keys()) {
        switch (param) {
          case "page":
            // pagination offset
            page = params.get(param);
            break;
          case "search":
            let searchParam = params.get(param).trim();
            paramObj.$or = [
              { title: { $regex: searchParam, $options: "i" } },
              { description: { $regex: searchParam, $options: "i" } },
            ];
            break;
          case "sort":
            // Sort by
            sortBy = params.get(param);
            break;
          default:
            paramObj[param] = params.get(param);
        }
      }
    }
    const sortParam = {};
    sortParam[sortBy] = "-1";
    Promotions.find(
      {
        archive: { $ne: true },
        ...paramObj,
      },
      (error, promotions) => {
        if (error) {
          handleError(response, error);
        } else {
          response.status(HttpStatus.OK).send(promotions);
        }
      }
    )
      .sort(sortParam)
      .limit(limit)
      .skip(page * limit);
  } catch (error) {
    handleError(response, error);
  }
};

const generatePromotions = async (request, response) => {
  console.log("--- generate promotions ---");
  const { amount = 10000 } = request.body;

  try {
    const newPromotionsArray = [];
    Array.from({ length: amount }, (x, i) => {
      const newPromotion = generateRandomPromotion(request.body, i);
      const promotionObject = new Promotions(newPromotion);
      newPromotionsArray.push(promotionObject);
    });

    await Promotions.create(newPromotionsArray, (error, ...newRowResponse) => {
      if (error) {
        throw error;
      } else {
        response.status(HttpStatus.OK).send(newRowResponse);
      }
    });
  } catch (error) {
    handleError(response, error);
  }
};

const duplicatePromotion = async (request, response) => {
  console.log("--- duplicate promotions ---");
  try {
    const { id } = request.params;
    Promotions.findOne({ id: id }, (error, promotion) => {
      if (error) {
        handleError(response, error);
      } else if (!promotion) {
        const message = `Error: Failed to delete promotion, no promotion found with id: ${id}`;
        handleError(response, message);
      } else {
        delete promotion._doc._id;
        delete promotion._doc.id;
        promotion.isNew = true;
        const duplicatePromotion = new Promotions(promotion);
        duplicatePromotion.parentId = id;
        duplicatePromotion.save((error, createdDuplicatePromotion) => {
          if (error) {
            handleError(response, error);
          } else {
            response.status(HttpStatus.OK).send(createdDuplicatePromotion);
          }
        });
      }
    });
  } catch (error) {
    handleError(response, error);
  }
};

const deletePromotion = async (request, response) => {
  console.log("---- delete promotions ----");
  try {
    const { id } = request.params;
    Promotions.findOne({ id: id }, (error, promotion) => {
      if (error) {
        handleError(response, error);
      } else if (!promotion) {
        const message = `Error: Failed to delete promotion, no promotion found with id: ${id}`;
        handleError(response, message);
      } else {
        promotion.archive = true;
        promotion.update_date = new Date();
        promotion.save((error, updatedPromotion) => {
          if (error) {
            handleError(response, error);
          } else {
            response.status(HttpStatus.OK).send(updatedPromotion);
          }
        });
      }
    });
  } catch (error) {
    handleError(response, error);
  }
};

module.exports = {
  getPromotions,
  generatePromotions,
  duplicatePromotion,
  deletePromotion,
};
