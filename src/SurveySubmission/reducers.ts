import * as t from "./actionTypes";
import { Action } from "./actions";
import { IFullSurveyWithAnswers } from "../types/Survey";
import { updateQuestionInCollection } from "../utils/helpers";

export interface ISurveySubmissionState {
  survey?: IFullSurveyWithAnswers;
}

const initialState: ISurveySubmissionState = {};

export default function (
  state = initialState,
  action: Action
): ISurveySubmissionState {
  switch (action.type) {
    case t.RETRIEVE_SURVEY_BY_ID_SUCCESS: {
      const { survey } = action;

      return {
        ...state,
        survey,
      };
    }

    case t.UPDATE_SURVEY_ANSWER: {
      const { questionId, answer } = action;

      const { survey } = state;

      if (survey) {
        const { questions } = survey;

        return {
          ...state,
          survey: {
            ...survey,
            questions: updateQuestionInCollection(questionId, questions, {
              answer,
            }),
          },
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
