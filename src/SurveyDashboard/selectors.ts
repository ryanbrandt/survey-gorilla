import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import { ISurvey } from "../types/Survey";
import { ISurveyAnswersByQuestion, ISurveyQuestionAnswer } from "./types";

export const selectOwnedSurveys = (): Array<ISurvey> =>
  useSelector((state: RootState) => state.surveyDashboard.ownedSurveys);

export const selectActiveSurveyResults = (): Array<ISurveyQuestionAnswer> =>
  useSelector((state: RootState) => state.surveyDashboard.results);

export const selectActiveSurveyTitle = (): string | undefined =>
  useSelector((state: RootState) => {
    const { activeSurvey, ownedSurveys } = state.surveyDashboard;

    const fullSurvey = ownedSurveys.find(
      (survey) => survey.id === activeSurvey
    );

    if (fullSurvey) {
      return fullSurvey.title;
    }

    return undefined;
  });

export const selectActiveSurveyResultsByQuestion =
  (): ISurveyAnswersByQuestion => {
    const results = selectActiveSurveyResults();

    return useMemo(() => {
      const resultsByQuestion: ISurveyAnswersByQuestion = {};

      results.forEach((result) => {
        const { user, values } = result;
        const { question } = result;

        if (resultsByQuestion[question.title]) {
          resultsByQuestion[question.title].push({
            user: user.email,
            answer: values.value,
          });
        } else {
          resultsByQuestion[question.title] = [
            {
              user: user.email,
              answer: values.value,
            },
          ];
        }
      });

      return resultsByQuestion;
    }, [results]);
  };
