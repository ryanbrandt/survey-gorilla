import { Input } from "handsome-ui";

import { ISurveyComponentRegistry, SurveyComponentProps } from "..";
import { useSurveyQuestionAnswer } from "../../SurveySubmission/hooks";
import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";
import SingleLineInputComponentCreator from "../Creators/SingleLineInputComponentCreator";

interface SingleLinInputProps extends SurveyComponentProps {
  type: "text" | "number" | "date";
  help?: string;
}

export const SingleLineInput = ({
  component,
  ...props
}: SingleLinInputProps): JSX.Element => {
  const [answer, setAnswer] = useSurveyQuestionAnswer(component.questionId, "");

  const { type, help } = props;

  let parsedValue: string | number = answer;
  if (type === "number") {
    parsedValue = parseInt(answer || "0", 10);
  }

  return (
    <Input
      help={help}
      type={type}
      value={parsedValue}
      onChange={setAnswer}
      error={!answer ? GENERIC_REQUIRED_ERROR : ""}
    />
  );
};

const SingleLineInputComponentSchema: ISurveyComponentRegistry = {
  "single-line-input@1.0.0": {
    component: SingleLineInput,
    displayType: "Single Line Input",
    creator: SingleLineInputComponentCreator,
  },
};

export default SingleLineInputComponentSchema;
