import { createElement } from "react";
import { useDispatch } from "react-redux";

import { Select, Input, RadioButton, Trash, Button } from "handsome-ui";

import {
  getAvailableSurveyComponentOptions,
  getSurveyComponentCreator,
} from "../../surveyComponentFactory";
import { ISurveyQuestionCreation } from "../reducer";
import { useSurveyQuestionConfiguration } from "../hooks";
import { GENERIC_CREATION_ERROR } from "../constants";
import { selectQuestionCanBeRemoved } from "../selectors";

import { removeSurveyQuestion } from "../actions";

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
  const { questionId } = question;

  const [configuration, setQuestionConfiguration] =
    useSurveyQuestionConfiguration(questionId);

  const { surveyComponentSchemaId, questionTitle, required } = configuration;

  const handleConfigurationChange = (
    configurationKey: string,
    configurationValue: any
  ) => {
    setQuestionConfiguration({
      ...configuration,
      [configurationKey]: configurationValue,
    });
  };

  const canRemove = selectQuestionCanBeRemoved();
  const dispatch = useDispatch();
  const dispatchRemoveQuestion = () => dispatch(removeSurveyQuestion(index));

  return (
    <div className="survey_creation-question_container flex_center-col">
      <h3>Question {index + 1} </h3>
      <Button
        title="Remove"
        onClick={dispatchRemoveQuestion}
        icon={<Trash width={22} height={22} />}
        disabled={!canRemove}
        round
        inverting
      />
      <RadioButton
        label="Required?"
        checked={required}
        onClick={() => handleConfigurationChange("required", !required)}
      />
      <Input
        label="Question Title*"
        value={questionTitle}
        onChange={(value: string) =>
          handleConfigurationChange("questionTitle", value)
        }
        error={!questionTitle ? GENERIC_CREATION_ERROR : ""}
      />
      <Select
        options={getAvailableSurveyComponentOptions()}
        label="Select Survey Question Type*"
        value={surveyComponentSchemaId}
        onChange={(value: string) =>
          handleConfigurationChange("surveyComponentSchemaId", value)
        }
        error={!surveyComponentSchemaId ? GENERIC_CREATION_ERROR : ""}
      />
      {surveyComponentSchemaId &&
        createElement(getSurveyComponentCreator(surveyComponentSchemaId), {
          component: {
            surveyComponentSchemaId,
            questionId,
            surveyId,
          },
        })}
    </div>
  );
};

export default SurveyQuestionCreation;
