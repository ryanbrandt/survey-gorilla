import { Switch, Route } from "react-router-dom";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";

import SurveyCreation from "../SurveyCreation/Components/SurveyCreation";
import SurveyDashboard from "../SurveyDashboard/Components/SurveyDashboard";

export const history = createBrowserHistory();

export enum ROUTES {
  dashboard = "/dashboard",
  creation = "/create-survey",
}

export default (
  <Switch>
    <Route path={ROUTES.creation} component={SurveyCreation} />
    <Route path={ROUTES.dashboard} component={SurveyDashboard} />
  </Switch>
);
