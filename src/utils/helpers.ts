import {
  IQuestion,
  ISurveyQuestionComponentConfiguration,
} from "../types/Question";

export const updateQuestionInCollection = <T>(
  questionId: string,
  questions: Array<T & IQuestion>,
  updatedValues: Partial<T & IQuestion>
): Array<T & IQuestion> => {
  const newQuestions = [...questions];

  const updatedQuestionIndex = questions.findIndex(
    (question) => question.id === questionId
  );

  if (updatedQuestionIndex > -1) {
    newQuestions[updatedQuestionIndex] = {
      ...newQuestions[updatedQuestionIndex],
      ...updatedValues,
    };
  }

  return newQuestions;
};

export const updateConfigurationFieldInCollection = (
  fieldName: string,
  configuration: Array<ISurveyQuestionComponentConfiguration<unknown>>,
  updatedValues: Pick<ISurveyQuestionComponentConfiguration<unknown>, "value">
): Array<ISurveyQuestionComponentConfiguration<unknown>> => {
  const updatedConfigurationFieldIndex = configuration.findIndex(
    (configurationItem) => configurationItem.name === fieldName
  );

  const newConfiguration = [...configuration];
  if (updatedConfigurationFieldIndex > -1) {
    newConfiguration[updatedConfigurationFieldIndex] = {
      ...newConfiguration[updatedConfigurationFieldIndex],
      ...updatedValues,
    };
  } else {
    newConfiguration.push({ name: fieldName, ...updatedValues });
  }

  return newConfiguration;
};
