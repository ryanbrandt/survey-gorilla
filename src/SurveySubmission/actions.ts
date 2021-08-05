import { IFullSurvey, IFullSurveyWithAnswers } from "../types/Survey";
import * as t from "./actionTypes";

export interface IRetrieveSurveyByIdRequest {
  type: t.T_RETRIEVE_SURVEY_BY_ID;
  id: string;
}

export const retrieveSurveyByIdRequest = (
  id: string
): IRetrieveSurveyByIdRequest => ({
  type: t.RETRIEVE_SURVEY_BY_ID,
  id,
});

export interface IRetrieveSurveyByIdSuccess {
  type: t.T_RETRIEVE_SURVEY_BY_ID_SUCCESS;
  survey: IFullSurvey;
}

export const retrieveSurveyByIdSuccess = (
  survey: IFullSurveyWithAnswers
): IRetrieveSurveyByIdSuccess => ({
  type: t.RETRIEVE_SURVEY_BY_ID_SUCCESS,
  survey,
});

export interface IUpdateSurveyQuestionAnswer<T> {
  type: t.T_UPDATE_SURVEY_ANSWER;
  questionId: string;
  answer: T;
}

export const updateSurveyQuestionAnswer = <T>(
  questionId: string,
  answer: T
): IUpdateSurveyQuestionAnswer<T> => ({
  type: t.UPDATE_SURVEY_ANSWER,
  questionId,
  answer,
});

export interface ISubmitSurveyRequest {
  type: t.T_SUBMIT_SURVEY_REQUEST;
  resolve: any;
  reject: any;
}

export const submitSurveyRequest = (
  resolve: any,
  reject: any
): ISubmitSurveyRequest => ({
  type: t.SUBMIT_SURVEY_REQUEST,
  resolve,
  reject,
});

export type Action =
  | IRetrieveSurveyByIdSuccess
  | IUpdateSurveyQuestionAnswer<unknown>;
