import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ISurveyComponent } from "../surveyComponentFactory";
import {
  updateSurveyComponentConfiguration,
  updateSurveyConfiguration,
  updateSurveyQuestion,
} from "./actions";
import { ISurveyCreationState, ISurveyQuestionCreation } from "./reducer";
import {
  selectQuestionById,
  selectQuestionComponentConfiguration,
  selectSurvey,
} from "./selectors";

export type IConfigurableQuestionProperties = Omit<
  ISurveyQuestionCreation,
  "questionId"
>;

export type IConfigurableSurveyProperties = Pick<
  ISurveyCreationState,
  "surveyTitle"
>;

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
    const { surveyId, questions, ...configuration } = survey;

    setSurveyConfiguration(configuration);
  }, [survey]);

  return [surveyConfiguration, dispatchSurveyConfigurationUpdate];
};

type SurveyQuestionConfigurationSetter = (
  values: IConfigurableQuestionProperties
) => void;

export const useSurveyQuestionConfiguration = (
  questionId: string
): [IConfigurableQuestionProperties, SurveyQuestionConfigurationSetter] => {
  const question = selectQuestionById(questionId);

  const _getQuestionConfiguration = (
    question?: IConfigurableQuestionProperties
  ): IConfigurableQuestionProperties => {
    return {
      questionTitle: question?.questionTitle ?? "",
      required: question?.required || false,
      surveyComponentSchemaId: question?.surveyComponentSchemaId ?? "",
      configuration: question?.configuration ?? [],
    };
  };

  const [configuration, setConfiguration] =
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
    dispatch(updateSurveyQuestion(questionId, newConfiguration));
  };

  return [configuration, dispatchConfigurationUpdate];
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

  const configuration = selectQuestionComponentConfiguration(
    component.questionId,
    fieldName
  );

  useEffect(() => {
    dispatchComponentConfigurationFieldUpdate(configurationFieldValue);
  }, []);

  useEffect(() => {
    if (configuration) {
      setConfigurationFieldValue(configuration.value);
    }
  }, [configuration]);

  return [configurationFieldValue, dispatchComponentConfigurationFieldUpdate];
};
