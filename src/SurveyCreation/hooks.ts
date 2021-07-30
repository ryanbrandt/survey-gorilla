import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ISurveyComponent } from "../surveyComponentFactory";
import {
  updateSurveyComponentConfiguration,
  updateSurveyQuestion,
} from "./actions";
import { ISurveyQuestionCreation } from "./reducer";
import {
  selectQuestionById,
  selectQuestionComponentConfiguration,
} from "./selectors";

export type IConfigurableQuestionProperties = Omit<
  ISurveyQuestionCreation,
  "questionId"
>;

type SurveyQuestionConfigurationSetter = (
  values: IConfigurableQuestionProperties
) => void;

export const useSurveyQuestionConfiguration = (
  questionId: string
): [IConfigurableQuestionProperties, SurveyQuestionConfigurationSetter] => {
  const question = selectQuestionById(questionId);

  const [configuration, setConfiguration] =
    useState<IConfigurableQuestionProperties>({
      questionTitle: question?.questionTitle ?? "",
      required: false,
      surveyComponentSchemaId: question?.surveyComponentSchemaId ?? "",
      configuration: question?.configuration ?? [],
    });

  useEffect(() => {
    setConfiguration({
      questionTitle: question?.questionTitle ?? "",
      required: false,
      surveyComponentSchemaId: question?.surveyComponentSchemaId ?? "",
      configuration: question?.configuration ?? [],
    });
  }, [question]);

  const dispatch = useDispatch();

  const dispatchConfigurationUpdate = (
    newConfiguration: IConfigurableQuestionProperties
  ) => dispatch(updateSurveyQuestion(questionId, newConfiguration));

  return [configuration, dispatchConfigurationUpdate];
};

type SurveyQuestionComponentConfigurationSetter<T> = (value: T) => void;

export const useSurveyQuestionComponentConfiguration = <T>(
  fieldName: string,
  component: ISurveyComponent,
  defaultValue: T,
  required = false
): [T, SurveyQuestionComponentConfigurationSetter<T>] => {
  const [configurationFieldValue, setConfigurationFieldValue] =
    useState<T>(defaultValue);

  const configuration = selectQuestionComponentConfiguration(
    component.questionId,
    fieldName
  );

  const dispatchComponentConfigurationFieldUpdate = (
    newConfigurationFieldValue: T
  ) =>
    dispatch(
      updateSurveyComponentConfiguration(
        component,
        fieldName,
        newConfigurationFieldValue,
        required
      )
    );

  useEffect(() => {
    setConfigurationFieldValue(configuration?.value as unknown as T);
  }, [configuration]);

  const dispatch = useDispatch();

  return [configurationFieldValue, dispatchComponentConfigurationFieldUpdate];
};
