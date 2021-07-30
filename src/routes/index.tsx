import { Switch, Route } from "react-router-dom";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";

import SurveyCreation from "../SurveyCreation/Components/SurveyCreation";

export const history = createBrowserHistory();

export enum ROUTES {
  dashboard = "/dashboard",
  creation = "/create-survey",
}

export default (
  <Switch>
    <Route path={ROUTES.creation} component={SurveyCreation} />
  </Switch>
);
