import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import {
  ISurveyCreationState,
  ISurveyQuestionComponentConfiguration,
  ISurveyQuestionCreation,
} from "./reducer";

export const selectSurvey = (): ISurveyCreationState =>
  useSelector((state: RootState) => state.surveyCreation);

export const selectSurveyId = (): string => {
  const survey = selectSurvey();

  return useMemo(() => survey.surveyId, [survey]);
};

export const selectSurveyCanBePublished = (): boolean => {
  const survey = selectSurvey();

  return useMemo(() => {
    if (!survey.surveyTitle) {
      return false;
    }

    const { questions } = survey;

    for (const question of questions) {
      if (!question.surveyComponentSchemaId || !question.questionTitle) {
        return false;
      }

      const { configuration } = question;

      for (const configurationItem of configuration) {
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
    () => questions.find((question) => question.questionId === id),
    [questions, id]
  );
};

export const selectQuestionComponentConfiguration = (
  questionId: string,
  fieldName: string
): ISurveyQuestionComponentConfiguration<any> | undefined => {
  const question = selectQuestionById(questionId);

  const configuration = question?.configuration || [];

  return useMemo(
    () =>
      configuration.find(
        (configurationItem) => configurationItem.name === fieldName
      ),
    [configuration]
  );
};
