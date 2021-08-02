import { createElement } from "react";
import { useDispatch } from "react-redux";

import { Select, Input, Trash, Button } from "handsome-ui";

import {
  getAvailableSurveyComponentOptions,
  getSurveyComponentCreator,
} from "../../surveyComponents";
import { ISurveyQuestionCreation } from "../types";
import { useSurveyQuestionConfiguration } from "../hooks";
import { GENERIC_CREATION_ERROR } from "../constants";
import { selectQuestionCanBeRemoved } from "../selectors";

import { removeSurveyQuestion } from "../actions";

interface Props {
  question: ISurveyQuestionCreation;
  index: number;
}

const SurveyQuestionCreation = ({
  question,
  index,
}: Props): React.ReactElement => {
  const { id } = question;

  const [componentConfiguration, setQuestionConfiguration] =
    useSurveyQuestionConfiguration(id);

  const { componentSchemaId, title } = componentConfiguration;

  const handleConfigurationChange = (
    configurationKey: string,
    configurationValue: any
  ) => {
    setQuestionConfiguration({
      ...componentConfiguration,
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
      <Input
        label="Question Title*"
        value={title}
        onChange={(value: string) => handleConfigurationChange("title", value)}
        error={!title ? GENERIC_CREATION_ERROR : ""}
      />
      <Select
        options={getAvailableSurveyComponentOptions()}
        label="Select Survey Question Type*"
        value={componentSchemaId}
        onChange={(value: string) =>
          handleConfigurationChange("componentSchemaId", value)
        }
        error={!componentSchemaId ? GENERIC_CREATION_ERROR : ""}
      />
      {componentSchemaId &&
        createElement(getSurveyComponentCreator(componentSchemaId), {
          component: {
            componentSchemaId,
            questionId: id,
          },
        })}
    </div>
  );
};

export default SurveyQuestionCreation;
