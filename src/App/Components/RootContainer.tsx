import React from "react";
import { Router } from "react-router";

import { AppContainer } from "handsome-ui";

import routes, { history } from "../../routes";

import AppSideMenu from "../Subcomponents/AppSideMenu";

const RootContainer = (): React.ReactElement => {
  return (
    <AppContainer className="root-container" header={<AppSideMenu />}>
      <Router history={history}>{routes}</Router>
    </AppContainer>
  );
};

export default RootContainer;
