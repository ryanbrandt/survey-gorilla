import { combineReducers } from "redux";

import surveyCreationReducer, {
  ISurveyCreationState,
} from "../SurveyCreation/reducer";

export interface RootState {
  surveyCreation: ISurveyCreationState;
}

export default combineReducers<RootState>({
  surveyCreation: surveyCreationReducer,
});
