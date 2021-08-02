import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import { ISurveyQuestionComponentConfiguration } from "../types/Question";
import { ISurveyCreationState } from "./reducer";

import { ISurveyQuestionCreation } from "./types";

export const selectSurvey = (): ISurveyCreationState =>
  useSelector((state: RootState) => state.surveyCreation);

export const selectSurveyId = (): string => {
  const survey = selectSurvey();

  return useMemo(() => survey.id, [survey]);
};

export const selectSurveyCanBePublished = (): boolean => {
  const survey = selectSurvey();

  return useMemo(() => {
    if (!survey.title) {
      return false;
    }

    const { questions } = survey;

    for (const question of questions) {
      if (!question.componentSchemaId || !question.title) {
        return false;
      }

      const { componentConfiguration } = question;

      for (const configurationItem of componentConfiguration) {
        if (configurationItem.required && !configurationItem.value) {
          return false;
        }
      }
    }

    return true;
  }, [survey]);
};

export const selectQuestionCanBeRemoved = (): boolean => {
  const questions = selectQuestions();

  return useMemo(() => questions.length > 1, [questions]);
};

export const selectQuestions = (): Array<ISurveyQuestionCreation> =>
  useSelector((state: RootState) => state.surveyCreation.questions);

export const selectQuestionById = (
  id: string
): ISurveyQuestionCreation | undefined => {
  const questions = selectQuestions();

  return useMemo(
    () => questions.find((question) => question.id === id),
    [questions, id]
  );
};

export const selectQuestionComponentConfiguration = (
  id: string,
  fieldName: string
): ISurveyQuestionComponentConfiguration<unknown> | undefined => {
  const question = selectQuestionById(id);

  const componentConfiguration = question?.componentConfiguration || [];

  return useMemo(
    () =>
      componentConfiguration.find(
        (configurationItem) => configurationItem.name === fieldName
      ),
    [componentConfiguration]
  );
};
