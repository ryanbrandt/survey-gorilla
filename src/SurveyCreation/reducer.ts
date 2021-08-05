import { v4 } from "uuid";

import * as t from "./actionTypes";
import { Action } from "./actions";
import { IQuestion } from "../types/Question";
import {
  updateConfigurationFieldInCollection,
  updateQuestionInCollection,
} from "../utils/helpers";

export interface ISurveyCreationState {
  id: string;
  title: string;
  questions: Array<IQuestion>;
}

const initialState: ISurveyCreationState = {
  id: v4(),
  title: "",
  questions: [
    {
      id: v4(),
      title: "",
      componentSchemaId: "",
      componentConfiguration: [],
    },
  ],
};

export default function (
  state = initialState,
  action: Action
): ISurveyCreationState {
  switch (action.type) {
    case t.UPDATE_SURVEY_CONFIGURATION: {
      const { surveyConfiguration } = action;

      return {
        ...state,
        ...surveyConfiguration,
      };
    }

    case t.ADD_SURVEY_QUESTION: {
      const newQuestion: IQuestion = {
        id: v4(),
        title: "",
        componentSchemaId: "",
        componentConfiguration: [],
      };

      return {
        ...state,
        questions: [...state.questions, newQuestion],
      };
    }

    case t.REMOVE_SURVEY_QUESTION: {
      const { questionIndex } = action;
      const { questions } = state;

      const newQuestions = [...questions];
      newQuestions.splice(questionIndex, 1);

      return {
        ...state,
        questions: newQuestions,
      };
    }

    case t.UPDATE_SURVEY_QUESTION: {
      const { componentConfiguration, id } = action;
      const { questions } = state;

      const updatedQuestion = questions.find((question) => question.id === id);

      if (updatedQuestion) {
        let newConfiguration = componentConfiguration.componentConfiguration;
        if (
          updatedQuestion.componentSchemaId !==
          componentConfiguration.componentSchemaId
        ) {
          newConfiguration = [];
        }

        return {
          ...state,
          questions: updateQuestionInCollection(id, questions, {
            ...componentConfiguration,
            componentConfiguration: newConfiguration,
          }),
        };
      }

      return state;
    }

    case t.UPDATE_SURVEY_COMPONENT_CONFIGURATION: {
      const { component, fieldName, value, required } = action;
      const { questionId } = component;

      const { questions } = state;

      const updatedQuestion = questions.find(
        (question) => question.id === questionId
      );
      if (updatedQuestion) {
        const { componentConfiguration } = updatedQuestion;

        return {
          ...state,
          questions: updateQuestionInCollection(questionId, questions, {
            componentConfiguration: updateConfigurationFieldInCollection(
              fieldName,
              componentConfiguration,
              { value }
            ),
          }),
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}
