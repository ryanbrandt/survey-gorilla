import { Switch, Route } from "react-router-dom";

// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";

import SurveyCreation from "../SurveyCreation/Components/SurveyCreation";
import SurveyDashboard from "../SurveyDashboard/Components/SurveyDashboard";
import SurveySubmission from "../SurveySubmission/Components/SurveySubmission";
import SurveyAnswerResults from "../SurveyDashboard/Components/SurveyAnswerResults";

export const history = createBrowserHistory();

export enum ROUTES {
  dashboard = "/",
  creation = "/create-survey",
  submission = "/take/:id",
  results = "/results/:id",
}

export default (
  <Switch>
    <Route exact path={ROUTES.creation} component={SurveyCreation} />
    <Route exact path={ROUTES.submission} component={SurveySubmission} />
    <Route exact path={ROUTES.results} component={SurveyAnswerResults} />

    <Route path="*" component={SurveyDashboard} />
  </Switch>
);
