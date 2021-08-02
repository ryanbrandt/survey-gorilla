import { v4 } from "uuid";

import * as t from "./actionTypes";
import { Action } from "./actions";

import { ISurveyQuestionCreation } from "./types";

export interface ISurveyCreationState {
  id: string;
  title: string;
  questions: Array<ISurveyQuestionCreation>;
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
      const newQuestion: ISurveyQuestionCreation = {
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

      const updatedQuestionIndex = state.questions.findIndex(
        (question) => question.id === id
      );

      const newQuestions = [...state.questions];
      if (updatedQuestionIndex > -1) {
        const previousQuestionConfiguration =
          newQuestions[updatedQuestionIndex];

        let questionComponentConfiguration =
          componentConfiguration.componentConfiguration;
        if (
          componentConfiguration.componentSchemaId !==
          previousQuestionConfiguration.componentSchemaId
        ) {
          questionComponentConfiguration = [];
        }

        newQuestions[updatedQuestionIndex] = {
          ...newQuestions[updatedQuestionIndex],
          ...componentConfiguration,
          componentConfiguration: questionComponentConfiguration,
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
        (question) => question.id === questionId
      );

      const newQuestions = [...state.questions];
      if (updatedQuestionIndex > -1) {
        const question = state.questions[updatedQuestionIndex];
        const { componentConfiguration } = question;

        const updatedConfigurationFieldIndex = componentConfiguration.findIndex(
          (configurationItem) => configurationItem.name === fieldName
        );

        const newConfiguration = [...componentConfiguration];
        if (updatedConfigurationFieldIndex > -1) {
          newConfiguration[updatedConfigurationFieldIndex] = {
            ...newConfiguration[updatedConfigurationFieldIndex],
            value,
          };
        } else {
          newConfiguration.push({ name: fieldName, value, required });
        }

        newQuestions[updatedQuestionIndex] = {
          ...newQuestions[updatedQuestionIndex],
          componentConfiguration: newConfiguration,
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
