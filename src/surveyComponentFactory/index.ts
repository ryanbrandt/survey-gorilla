import React from "react";

import SingleLineInputComponentSchema from "../surveyComponents/Components/SingleLineInput";
import TextareaInputComponentSchema from "../surveyComponents/Components/TextareaInput";

export interface ISurveyComponent {
  surveyComponentSchemaId: string;
  surveyId: string;
  questionId: string;
}

export interface SurveyComponentProps {
  component: ISurveyComponent;

  label?: string;
  required?: boolean;
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
  return Object.keys(surveyComponentRegistry).map(
    (surveyComponentSchemaId) => ({
      label: surveyComponentRegistry[surveyComponentSchemaId].displayType,
      value: surveyComponentSchemaId,
    })
  );
};

export const getSurveyComponentCreator = (
  surveyComponentSchemaId: string
): React.ComponentType<any> => {
  return surveyComponentRegistry[surveyComponentSchemaId].creator;
};

const surveyComponentFactory = (
  component: ISurveyComponent
): React.ComponentType<SurveyComponentProps & any> | undefined => {
  const entry: ISurveyComponentRegistryEntry | undefined =
    surveyComponentRegistry[component.surveyComponentSchemaId];

  if (entry) {
    return entry.component;
  }

  return undefined;
};

export default surveyComponentFactory;
