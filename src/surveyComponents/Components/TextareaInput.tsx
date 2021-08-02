import { Text } from "handsome-ui";

import { ISurveyComponentRegistry, SurveyComponentProps } from "..";

import { useSurveyQuestionAnswer } from "../../SurveySubmission/hooks";
import TextareaInputCreator from "../Creators/TextareaInputCreator";

interface TextAreaInputProps extends SurveyComponentProps {
  placeholder?: string;
  help?: string;
}

export const TextAreaInput = ({
  component,
  ...props
}: TextAreaInputProps): JSX.Element => {
  const [answer, setAnswer] = useSurveyQuestionAnswer(component.questionId, "");

  const { placeholder, help } = props;

  return (
    <Text
      placeholder={placeholder}
      help={help}
      value={answer}
      onChange={setAnswer}
    />
  );
};

const TextareaInputComponentSchema: ISurveyComponentRegistry = {
  "textarea-input@1.0.0": {
    component: TextAreaInput,
    displayType: "Multiline Text Input",
    creator: TextareaInputCreator,
  },
};

export default TextareaInputComponentSchema;
