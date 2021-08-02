import * as t from "./actionTypes";
import { Action } from "./actions";
import { ISurvey } from "../types/Survey";
import { ISurveyQuestionAnswer } from "./types";

export interface ISurveyDashboardState {
  ownedSurveys: Array<ISurvey>;
  takenSurveys: Array<ISurvey>;
  activeSurvey: string;
  results: Array<ISurveyQuestionAnswer>;
}

const initialState: ISurveyDashboardState = {
  ownedSurveys: [],
  takenSurveys: [],
  activeSurvey: "",
  results: [],
};

export default function (
  state = initialState,
  action: Action
): ISurveyDashboardState {
  switch (action.type) {
    case t.LIST_OWNED_SURVEYS_SUCCESS: {
      const { surveys } = action;

      return {
        ...state,
        ownedSurveys: surveys,
      };
    }

    case t.SET_ACTIVE_SURVEY: {
      const { id } = action;

      return {
        ...state,
        activeSurvey: id,
      };
    }

    case t.ACTIVE_SURVEY_RESULTS_SUCCESS: {
      const { results } = action;

      return {
        ...state,
        results,
      };
    }

    default: {
      return state;
    }
  }
}
