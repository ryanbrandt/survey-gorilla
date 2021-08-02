import { combineReducers } from "redux";

import surveyCreationReducer, {
  ISurveyCreationState,
} from "../SurveyCreation/reducer";
import surveyDashboardReducer, {
  ISurveyDashboardState,
} from "../SurveyDashboard/reducer";
import surveySubmissionReducer, {
  ISurveySubmissionState,
} from "../SurveySubmission/reducers";

export interface RootState {
  surveyCreation: ISurveyCreationState;
  surveyDashboard: ISurveyDashboardState;
  surveySubmission: ISurveySubmissionState;
}

export default combineReducers<RootState>({
  surveyCreation: surveyCreationReducer,
  surveyDashboard: surveyDashboardReducer,
  surveySubmission: surveySubmissionReducer,
});
