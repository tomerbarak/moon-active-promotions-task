import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import CommonUI from "./components/UI/CommonUI/CommonUI";
import { URLS } from "./utils/constants";
import { PromotionsContainer, ErrorBoundary } from "./containers";
import Header from "./components/Header/Header";

export default () => (
  <Suspense fallback={ErrorBoundary}>
    <Header />
    <Switch>
      <Route exact path={URLS.GENERAL.HOME} component={PromotionsContainer} />
    </Switch>
    <CommonUI />
  </Suspense>
);
