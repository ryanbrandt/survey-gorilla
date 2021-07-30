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
  const questions = selectQuestions();

  return useMemo(() => {
    for (const question of questions) {
      const { configuration } = question;

      for (const configurationItem of configuration) {
        if (configurationItem.required && !configurationItem.value) {
          return false;
        }
      }
    }

    return true;
  }, [questions]);
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
): ISurveyQuestionComponentConfiguration | undefined => {
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
