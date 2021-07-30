import { v4 } from "uuid";

import * as t from "./actionTypes";
import { Action } from "./actions";

export interface ISurveyQuestionComponentConfiguration {
  name: string;
  value: string;
  required: boolean;
}

export interface ISurveyQuestionCreation {
  questionId: string;
  questionTitle: string;
  surveyComponentSchemaId: string;
  required: boolean;
  configuration: Array<ISurveyQuestionComponentConfiguration>;
}

export interface ISurveyCreationState {
  surveyId: string;
  surveyTitle: string;
  questions: Array<ISurveyQuestionCreation>;
}

const initialState: ISurveyCreationState = {
  surveyId: v4(),
  surveyTitle: "",
  questions: [
    {
      questionId: v4(),
      questionTitle: "",
      required: false,
      surveyComponentSchemaId: "",
      configuration: [],
    },
  ],
};

export default function (
  state = initialState,
  action: Action
): ISurveyCreationState {
  switch (action.type) {
    case t.ADD_SURVEY_QUESTION: {
      const newQuestion: ISurveyQuestionCreation = {
        questionId: v4(),
        questionTitle: "",
        required: true,
        surveyComponentSchemaId: "",
        configuration: [],
      };

      return {
        ...state,
        questions: [...state.questions, newQuestion],
      };
    }

    case t.UPDATE_SURVEY_QUESTION: {
      const { configuration, questionId } = action;

      const updatedQuestionIndex = state.questions.findIndex(
        (question) => question.questionId === questionId
      );

      const newQuestions = [...state.questions];
      if (updatedQuestionIndex > -1) {
        newQuestions[updatedQuestionIndex] = {
          ...newQuestions[updatedQuestionIndex],
          ...configuration,
        };
      }

      return {
        ...state,
        questions: newQuestions,
      };
    }

    case t.UPDATE_SURVEY_COMPONENT_CONFIGURATION: {
      const { component, fieldName, value, required } = action;
      const { questionId } = component;

      const updatedQuestionIndex = state.questions.findIndex(
        (question) => question.questionId === questionId
      );

      const newQuestions = [...state.questions];
      if (updatedQuestionIndex > -1) {
        const question = state.questions[updatedQuestionIndex];
        const { configuration } = question;

        const updatedConfigurationFieldIndex = configuration.findIndex(
          (configurationItem) => configurationItem.name === fieldName
        );

        const newConfiguration = [...configuration];
        if (updatedConfigurationFieldIndex > -1) {
          newConfiguration[updatedConfigurationFieldIndex] = value;
        } else {
          newConfiguration.push({ name: fieldName, value, required });
        }

        newQuestions[updatedQuestionIndex] = {
          ...newQuestions[updatedQuestionIndex],
          configuration: newConfiguration,
        };
      }

      return {
        ...state,
        questions: newQuestions,
      };
    }

    default: {
      return state;
    }
  }
}
