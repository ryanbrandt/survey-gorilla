import React from "react";

import { ISurveyQuestionComponentConfiguration } from "../types/Question";
import SingleLineInputComponentSchema from "./Components/SingleLineInput";
import TextareaInputComponentSchema from "./Components/TextareaInput";

export interface ISurveyComponent {
  componentSchemaId: string;
  questionId: string;
}

export interface SurveyComponentProps {
  component: ISurveyComponent;
}

interface ISurveyComponentRegistryEntry {
  component: React.ComponentType<SurveyComponentProps & any>;

  displayType: string;
  creator: React.ComponentType<any>;
}

export type ISurveyComponentRegistry = Record<
  string,
  ISurveyComponentRegistryEntry
>;

const surveyComponentRegistry: ISurveyComponentRegistry = {
  ...SingleLineInputComponentSchema,
  ...TextareaInputComponentSchema,
};

export const getAvailableSurveyComponentOptions = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(surveyComponentRegistry).map((componentSchemaId) => ({
    label: surveyComponentRegistry[componentSchemaId].displayType,
    value: componentSchemaId,
  }));
};

export const getSurveyComponentCreator = (
  surveyComponentSchemaId: string
): React.ComponentType<any> => {
  return surveyComponentRegistry[surveyComponentSchemaId].creator;
};

export const surveyQuestionComponentConfigurationToProps = (
  configuration: Array<ISurveyQuestionComponentConfiguration<unknown>>
): object =>
  configuration.reduce(
    (props, config) => ({ ...props, [config.name]: config.value }),
    {}
  );

const surveyComponentFactory = (
  component: ISurveyComponent
): React.ComponentType<SurveyComponentProps & any> | undefined => {
  const entry: ISurveyComponentRegistryEntry | undefined =
    surveyComponentRegistry[component.componentSchemaId];

  if (entry) {
    return entry.component;
  }

  return undefined;
};

export default surveyComponentFactory;
