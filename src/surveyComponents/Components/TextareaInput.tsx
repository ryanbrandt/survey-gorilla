import { Text } from "handsome-ui";

import {
  ISurveyComponentRegistry,
  SurveyComponentProps,
} from "../../surveyComponentFactory";
import { useSurveyComponentPersistence } from "../../persistence";
import TextareaInputCreator from "../Creators/TextareaInputCreator";

export const TextAreaInput = ({
  component,
  ...props
}: SurveyComponentProps): JSX.Element => {
  const [value, setPersistedValue] = useSurveyComponentPersistence<string>(
    "value",
    component,
    ""
  );

  const { label } = props;

  return <Text label={label} value={value} onChange={setPersistedValue} />;
};

const TextareaInputComponentSchema: ISurveyComponentRegistry = {
  "textarea-input@1.0.0": {
    component: TextAreaInput,
    displayType: "Multiline Text Input",
    creator: TextareaInputCreator,
  },
};

export default TextareaInputComponentSchema;
