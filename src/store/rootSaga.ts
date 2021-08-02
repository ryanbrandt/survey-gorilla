/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from "redux-saga/effects";

import surveyCreationSaga from "../SurveyCreation/sagas";
import surveyDashboardSaga from "../SurveyDashboard/sagas";
import surveySubmissionSaga from "../SurveySubmission/sagas";

export default function* rootSaga() {
  yield all([
    surveyCreationSaga(),
    surveyDashboardSaga(),
    surveySubmissionSaga(),
  ]);
}
