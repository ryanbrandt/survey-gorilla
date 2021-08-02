import * as t from "./actionTypes";

import { ISurvey } from "../types/Survey";
import { ISurveyQuestionAnswer } from "./types";

export interface IListOwnedSurveysRequest {
  type: t.T_LIST_OWNED_SURVEYS_REQUEST;
  userId: string;
}

export const listOwnedSurveysRequest = (
  userId: string
): IListOwnedSurveysRequest => {
  return {
    type: t.LIST_OWNED_SURVEYS_REQUEST,
    userId,
  };
};

export interface IListOwnedSurveysSuccess {
  type: t.T_LIST_OWNED_SURVEYS_SUCCESS;
  surveys: Array<ISurvey>;
}

export const listOwnedSurveysSuccess = (
  surveys: Array<ISurvey>
): IListOwnedSurveysSuccess => {
  return {
    type: t.LIST_OWNED_SURVEYS_SUCCESS,
    surveys,
  };
};

export interface ISetActiveSurvey {
  type: t.T_SET_ACTIVE_SURVEY;
  id: string;
}

export const setActiveSurvey = (id: string): ISetActiveSurvey => {
  return {
    type: t.SET_ACTIVE_SURVEY,
    id,
  };
};

export interface IActiveSurveyResultsRequest {
  type: t.T_ACTIVE_SURVEY_RESULTS_REQUEST;
}

export const activeSurveyResultsRequest = (): IActiveSurveyResultsRequest => {
  return {
    type: t.ACTIVE_SURVEY_RESULTS_REQUEST,
  };
};

export interface IActiveSurveyResultsSuccess {
  type: t.T_ACTIVE_SURVEY_RESULTS_SUCCESS;
  results: Array<ISurveyQuestionAnswer>;
}

export const activeSurveyResultsSuccess = (
  results: Array<ISurveyQuestionAnswer>
): IActiveSurveyResultsSuccess => {
  return {
    type: t.ACTIVE_SURVEY_RESULTS_SUCCESS,
    results,
  };
};

export type Action =
  | IListOwnedSurveysSuccess
  | ISetActiveSurvey
  | IActiveSurveyResultsSuccess;
