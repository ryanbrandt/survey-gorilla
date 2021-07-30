import { ISurveyComponent } from "../surveyComponentFactory";
import * as t from "./actionTypes";
import {
  IConfigurableQuestionProperties,
  IConfigurableSurveyProperties,
} from "./hooks";

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

interface IAddSurveyQuestion {
  type: t.T_ADD_SURVEY_QUESTION;
}

export const addSurveyQuestion = (): IAddSurveyQuestion => {
  return {
    type: t.ADD_SURVEY_QUESTION,
  };
};

interface IRemoveSurveyQuestion {
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

interface IUpdateSurveyQuestion {
  type: t.T_UPDATE_SURVEY_QUESTION;
  questionId: string;
  configuration: IConfigurableQuestionProperties;
}

export const updateSurveyQuestion = (
  questionId: string,
  configuration: IConfigurableQuestionProperties
): IUpdateSurveyQuestion => {
  return {
    type: t.UPDATE_SURVEY_QUESTION,
    questionId,
    configuration,
  };
};

interface IUpdateSurveyComponentConfiguration {
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

export type Action =
  | IUpdateSurveyConfiguration
  | IAddSurveyQuestion
  | IRemoveSurveyQuestion
  | IUpdateSurveyQuestion
  | IUpdateSurveyComponentConfiguration;
