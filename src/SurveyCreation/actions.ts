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
): IUpdateSurveyConfiguration => ({
  type: t.UPDATE_SURVEY_CONFIGURATION,
  surveyConfiguration,
});

export interface IAddSurveyQuestion {
  type: t.T_ADD_SURVEY_QUESTION;
}

export const addSurveyQuestion = (): IAddSurveyQuestion => ({
  type: t.ADD_SURVEY_QUESTION,
});

export interface IRemoveSurveyQuestion {
  type: t.T_REMOVE_SURVEY_QUESTION;
  questionIndex: number;
}

export const removeSurveyQuestion = (
  questionIndex: number
): IRemoveSurveyQuestion => ({
  type: t.REMOVE_SURVEY_QUESTION,
  questionIndex,
});

export interface IUpdateSurveyQuestion {
  type: t.T_UPDATE_SURVEY_QUESTION;
  id: string;
  componentConfiguration: IConfigurableQuestionProperties;
}

export const updateSurveyQuestion = (
  id: string,
  componentConfiguration: IConfigurableQuestionProperties
): IUpdateSurveyQuestion => ({
  type: t.UPDATE_SURVEY_QUESTION,
  id,
  componentConfiguration,
});

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
): IUpdateSurveyComponentConfiguration => ({
  type: t.UPDATE_SURVEY_COMPONENT_CONFIGURATION,
  component,
  fieldName,
  value,
  required,
});

export interface IPublishSurveyRequest {
  type: t.T_PUBLISH_SURVEY_REQUEST;
  resolve: any;
  reject: any;
}

export const publishSurveyRequest = (
  resolve: any,
  reject: any
): IPublishSurveyRequest => ({
  type: t.PUBLISH_SURVEY_REQUEST,
  resolve,
  reject,
});

export type Action =
  | IUpdateSurveyConfiguration
  | IAddSurveyQuestion
  | IRemoveSurveyQuestion
  | IUpdateSurveyQuestion
  | IUpdateSurveyComponentConfiguration;
