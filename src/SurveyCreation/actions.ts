import { ISurveyComponent } from "../surveyComponents";
import * as t from "./actionTypes";
import {
  IConfigurableQuestionProperties,
  IConfigurableSurveyProperties,
} from "./types";
import { ISurveyCreationState } from "./reducer";

export interface IUpdateSurveyConfiguration {
  type: t.T_UPDATE_SURVEY_CONFIGURATION;
  surveyConfiguration: IConfigurableSurveyProperties;
}

export const updateSurveyConfiguration = (
  surveyConfiguration: IConfigurableSurveyProperties
): IUpdateSurveyConfiguration => {
  return {
    type: t.UPDATE_SURVEY_CONFIGURATION,
    surveyConfiguration,
  };
};

export interface IAddSurveyQuestion {
  type: t.T_ADD_SURVEY_QUESTION;
}

export const addSurveyQuestion = (): IAddSurveyQuestion => {
  return {
    type: t.ADD_SURVEY_QUESTION,
  };
};

export interface IRemoveSurveyQuestion {
  type: t.T_REMOVE_SURVEY_QUESTION;
  questionIndex: number;
}

export const removeSurveyQuestion = (
  questionIndex: number
): IRemoveSurveyQuestion => {
  return {
    type: t.REMOVE_SURVEY_QUESTION,
    questionIndex,
  };
};

export interface IUpdateSurveyQuestion {
  type: t.T_UPDATE_SURVEY_QUESTION;
  id: string;
  componentConfiguration: IConfigurableQuestionProperties;
}

export const updateSurveyQuestion = (
  id: string,
  componentConfiguration: IConfigurableQuestionProperties
): IUpdateSurveyQuestion => {
  return {
    type: t.UPDATE_SURVEY_QUESTION,
    id,
    componentConfiguration,
  };
};

export interface IUpdateSurveyComponentConfiguration {
  type: t.T_UPDATE_SURVEY_COMPONENT_CONFIGURATION;
  component: ISurveyComponent;
  fieldName: string;
  value: any;
  required: boolean;
}

export const updateSurveyComponentConfiguration = (
  component: ISurveyComponent,
  fieldName: string,
  value: any,
  required = false
): IUpdateSurveyComponentConfiguration => {
  return {
    type: t.UPDATE_SURVEY_COMPONENT_CONFIGURATION,
    component,
    fieldName,
    value,
    required,
  };
};

export interface IPublishSurveyRequest {
  type: t.T_PUBLISH_SURVEY_REQUEST;
  survey: ISurveyCreationState;
  resolve: any;
  reject: any;
}

export const publishSurveyRequest = (
  survey: ISurveyCreationState,
  resolve: any,
  reject: any
): IPublishSurveyRequest => {
  return {
    type: t.PUBLISH_SURVEY_REQUEST,
    survey,
    resolve,
    reject,
  };
};

export type Action =
  | IUpdateSurveyConfiguration
  | IAddSurveyQuestion
  | IRemoveSurveyQuestion
  | IUpdateSurveyQuestion
  | IUpdateSurveyComponentConfiguration;
