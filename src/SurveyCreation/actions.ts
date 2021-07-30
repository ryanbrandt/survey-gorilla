import { ISurveyComponent } from "../surveyComponentFactory";
import * as t from "./actionTypes";
import { IConfigurableQuestionProperties } from "./hooks";

interface IAddSurveyQuestion {
  type: t.T_ADD_SURVEY_QUESTION;
}

export const addSurveyQuestion = (): IAddSurveyQuestion => {
  return {
    type: t.ADD_SURVEY_QUESTION,
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
  | IAddSurveyQuestion
  | IUpdateSurveyQuestion
  | IUpdateSurveyComponentConfiguration;
