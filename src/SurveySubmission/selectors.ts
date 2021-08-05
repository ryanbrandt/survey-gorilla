import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import { IFullSurveyWithAnswers } from "../types/Survey";

export const selectSurveyToTake = (): IFullSurveyWithAnswers | undefined =>
  useSelector((state: RootState) => state.surveySubmission.survey);

export const selectSurveyQuestionAnswer = <T>(
  questionId: string
): T | undefined => {
  const survey = selectSurveyToTake();

  return useMemo(() => {
    if (survey) {
      const { questions } = survey;

      const question = questions.find((q) => q.id === questionId);

      if (question) {
        return question.answer as T;
      }
    }

    return undefined;
  }, [survey]);
};

export const selectSurveyCanBeSubmitted = (): boolean => {
  const survey = selectSurveyToTake();

  return useMemo(() => {
    if (survey) {
      const { questions } = survey;

      let canSubmit = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const question of questions) {
        const { answer } = question;
        if (answer === undefined || answer === null || answer === "") {
          canSubmit = false;
          break;
        }
      }

      return canSubmit;
    }

    return false;
  }, [survey]);
};
