import * as t from "./actionTypes";
import { Action } from "./actions";
import { IFullSurveyWithAnswers } from "../types/Survey";

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
        const updatedQuestionIndex = questions.findIndex(
          (question) => question.id === questionId
        );

        const newQuestions = [...questions];
        if (updatedQuestionIndex > -1) {
          newQuestions[updatedQuestionIndex] = {
            ...newQuestions[updatedQuestionIndex],
            answer,
          };
        }

        return {
          ...state,
          survey: {
            ...survey,
            questions: newQuestions,
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
