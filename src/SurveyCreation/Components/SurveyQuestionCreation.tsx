import { createElement } from "react";
import { useDispatch } from "react-redux";

import { Trash, Button } from "handsome-ui";

import {
  getAvailableSurveyComponentOptions,
  surveyComponentCreatorFactory,
} from "../../surveyComponents";
import { useSurveyQuestionConfiguration } from "../hooks";
import { selectQuestionCanBeRemoved } from "../selectors";
import { removeSurveyQuestion } from "../actions";
import { IQuestion } from "../../types/Question";
import RequiredInput from "../../common/Components/RequiredInput";
import RequiredSelect from "../../common/Components/RequiredSelect";

interface Props {
  question: IQuestion;
  index: number;
}

enum CONFIGURABLE_QUESTION_ATTRIBUTES {
  title = "title",
  schema = "componentSchemaId",
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
    configurationKey: CONFIGURABLE_QUESTION_ATTRIBUTES,
    configurationValue: any
  ) => {
    setQuestionConfiguration({
      ...componentConfiguration,
      [configurationKey]: configurationValue,
    });
  };

  const _renderQuestionCreationComponent = (): React.ReactNode => {
    const creationComponent = surveyComponentCreatorFactory(componentSchemaId);

    if (creationComponent) {
      return createElement(creationComponent, {
        component: {
          componentSchemaId,
          questionId: id,
        },
      });
    }

    return <div>This component is not supported</div>;
  };

  const canRemove = selectQuestionCanBeRemoved();
  const dispatch = useDispatch();
  const dispatchRemoveQuestion = () => dispatch(removeSurveyQuestion(index));

  return (
    <div className="flex_center-col">
      <h3>Question {index + 1} </h3>
      <Button
        title="Remove"
        onClick={dispatchRemoveQuestion}
        icon={<Trash width={22} height={22} />}
        disabled={!canRemove}
        round
        inverting
      />
      <RequiredInput
        label="Question Title*"
        value={title}
        onChange={(value: string) =>
          handleConfigurationChange(
            CONFIGURABLE_QUESTION_ATTRIBUTES.title,
            value
          )
        }
      />
      <RequiredSelect
        options={getAvailableSurveyComponentOptions()}
        label="Select Question Type*"
        value={componentSchemaId}
        onChange={(value: string) =>
          handleConfigurationChange(
            CONFIGURABLE_QUESTION_ATTRIBUTES.schema,
            value
          )
        }
      />
      {componentSchemaId && _renderQuestionCreationComponent()}
    </div>
  );
};

export default SurveyQuestionCreation;
