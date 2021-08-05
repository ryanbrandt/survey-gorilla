import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ISurveyComponent } from "../surveyComponents";
import {
  updateSurveyComponentConfiguration,
  updateSurveyConfiguration,
  updateSurveyQuestion,
} from "./actions";
import {
  IConfigurableQuestionProperties,
  IConfigurableSurveyProperties,
} from "./types";
import {
  selectQuestionById,
  selectQuestionComponentConfiguration,
  selectSurvey,
} from "./selectors";

type SurveyConfigurationSetter = (
  surveyConfiguration: IConfigurableSurveyProperties
) => void;

export const useSurveyConfiguration = (
  initialSurveyConfiguration: IConfigurableSurveyProperties
): [IConfigurableSurveyProperties, SurveyConfigurationSetter] => {
  const survey = selectSurvey();

  const [surveyConfiguration, setSurveyConfiguration] = useState(
    initialSurveyConfiguration
  );

  const dispatch = useDispatch();

  const dispatchSurveyConfigurationUpdate = (
    newSurveyConfiguration: IConfigurableSurveyProperties
  ) => dispatch(updateSurveyConfiguration(newSurveyConfiguration));

  useEffect(() => {
    const { id, questions, ...componentConfiguration } = survey;

    setSurveyConfiguration(componentConfiguration);
  }, [survey]);

  return [surveyConfiguration, dispatchSurveyConfigurationUpdate];
};

type SurveyQuestionConfigurationSetter = (
  values: IConfigurableQuestionProperties
) => void;

export const useSurveyQuestionConfiguration = (
  id: string
): [IConfigurableQuestionProperties, SurveyQuestionConfigurationSetter] => {
  const question = selectQuestionById(id);

  const _getQuestionConfiguration = (
    question?: IConfigurableQuestionProperties
  ): IConfigurableQuestionProperties => ({
    title: question?.title ?? "",
    componentSchemaId: question?.componentSchemaId ?? "",
    componentConfiguration: question?.componentConfiguration ?? [],
  });

  const [componentConfiguration, setConfiguration] =
    useState<IConfigurableQuestionProperties>(
      _getQuestionConfiguration(question)
    );

  useEffect(() => {
    setConfiguration(_getQuestionConfiguration(question));
  }, [question]);

  const dispatch = useDispatch();

  const dispatchConfigurationUpdate = (
    newConfiguration: IConfigurableQuestionProperties
  ) => {
    dispatch(updateSurveyQuestion(id, newConfiguration));
  };

  return [componentConfiguration, dispatchConfigurationUpdate];
};

type SurveyQuestionComponentConfigurationSetter<T> = (value: T) => void;

export const useSurveyQuestionComponentConfiguration = <T>(
  fieldName: string,
  component: ISurveyComponent,
  defaultValue: T,
  required = false
): [T, SurveyQuestionComponentConfigurationSetter<T>] => {
  const dispatch = useDispatch();

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

  const [configurationFieldValue, setConfigurationFieldValue] =
    useState<T>(defaultValue);

  const componentConfiguration = selectQuestionComponentConfiguration(
    component.questionId,
    fieldName
  );

  useEffect(() => {
    dispatchComponentConfigurationFieldUpdate(defaultValue);
  }, []);

  useEffect(() => {
    if (componentConfiguration) {
      setConfigurationFieldValue(componentConfiguration.value as T);
    }
  }, [componentConfiguration]);

  return [configurationFieldValue, dispatchComponentConfigurationFieldUpdate];
};
