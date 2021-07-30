import { createElement } from "react";

import { Select, Input } from "handsome-ui";

import {
  getAvailableSurveyComponentOptions,
  getSurveyComponentCreator,
} from "../../surveyComponentFactory";

import { ISurveyQuestionCreation } from "../reducer";
import { useSurveyQuestionConfiguration } from "../hooks";

interface Props {
  surveyId: string;
  question: ISurveyQuestionCreation;
  index: number;
}

const SurveyQuestionCreation = ({
  surveyId,
  question,
  index,
}: Props): React.ReactElement => {
  const [configuration, setQuestionConfiguration] =
    useSurveyQuestionConfiguration(question.questionId);

  const component = {
    componentSchemaId: configuration.surveyComponentSchemaId,
    questionId: question.questionId,
    surveyId,
  };

  return (
    <div className="survey_creation-question_container flex_center-col">
      <h3>Question {index + 1} </h3>
      <Input
        label="Question Title*"
        value={configuration.questionTitle}
        onChange={(value: string) =>
          setQuestionConfiguration({ ...configuration, questionTitle: value })
        }
      />
      <Select
        options={getAvailableSurveyComponentOptions()}
        label="Select Survey Question Type*"
        value={configuration.surveyComponentSchemaId}
        onChange={(value: string) =>
          setQuestionConfiguration({
            ...configuration,
            surveyComponentSchemaId: value,
          })
        }
      />
      {configuration.surveyComponentSchemaId &&
        createElement(
          getSurveyComponentCreator(configuration.surveyComponentSchemaId),
          { component }
        )}
    </div>
  );
};

export default SurveyQuestionCreation;
