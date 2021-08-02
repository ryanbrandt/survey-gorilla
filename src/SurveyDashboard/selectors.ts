import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import { ISurvey } from "../types/Survey";
import { ISurveyQuestionAnswer } from "./types";

export const selectOwnedSurveys = (): Array<ISurvey> =>
  useSelector((state: RootState) => state.surveyDashboard.ownedSurveys);

export const selectActiveSurveyResults = (): Array<ISurveyQuestionAnswer> =>
  useSelector((state: RootState) => state.surveyDashboard.results);

export const selectActiveSurveyResultsByQuestion = (): any => {
  const results = selectActiveSurveyResults();

  return useMemo(() => {
    const resultsByQuestion: any = {};

    results.forEach((result) => {
      resultsByQuestion[result.question.title] = [
        ...(resultsByQuestion[result.question.id] || []),
        {
          user: result.user.email,
          answer: result.values.value,
        },
      ];
    });

    return resultsByQuestion;
  }, [results]);
};
