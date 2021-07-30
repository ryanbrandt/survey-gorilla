import { Input } from "handsome-ui";

import {
  ISurveyComponentRegistry,
  SurveyComponentProps,
} from "../../surveyComponentFactory";
import { useSurveyComponentPersistence } from "../../persistence";
import BaseComponentCreator from "../Creators/SingleLineInputComponentCreator";

interface SingleLinInputProps extends SurveyComponentProps {
  type: "text" | "number" | "date";
  placeholder?: string;
}

export const SingleLineInput = ({
  component,
  ...props
}: SingleLinInputProps): JSX.Element => {
  const [value, setPersistedValue] = useSurveyComponentPersistence<string>(
    "value",
    component,
    ""
  );

  const { label, type, placeholder } = props;

  let parsedValue: string | number = value;
  if (type === "number") {
    parsedValue = parseInt(value, 10);
  }

  return (
    <Input
      label={label}
      placeholder={placeholder}
      type={type}
      value={parsedValue}
      onChange={setPersistedValue}
    />
  );
};

const SingleLineInputComponentSchema: ISurveyComponentRegistry = {
  "single-line-input@1.0.0": {
    component: SingleLineInput,
    displayType: "Single Line Input",
    creator: BaseComponentCreator,
  },
};

export default SingleLineInputComponentSchema;
