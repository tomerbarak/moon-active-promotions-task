const { Router } = require("express");
const ResponseMiddlewares = require("../middlewares/response.middlewares");
const promotionsRouter = require("../controllers/promotions.controller");

module.exports = (app) => {
  const router = Router();

  app.use(ResponseMiddlewares.errorHandlerMiddleware.bind(ResponseMiddlewares));
  app.use("/", router);

  router.get("/api/getPromotions", promotionsRouter.getPromotions);
  router.post("/api/createPromotions", promotionsRouter.generatePromotions);
  router.post(
    "/api/duplicatePromotion/:id",
    promotionsRouter.duplicatePromotion
  );
  router.delete("/api/deletePromotion/:id", promotionsRouter.deletePromotion);
  router.put("/api/editPromotionName/:id", promotionsRouter.editPromotionName);
};
