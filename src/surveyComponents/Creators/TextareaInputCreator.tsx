import { Column, Input } from "handsome-ui";

import { SurveyComponentProps } from "../../surveyComponentFactory";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";

const TextareaInputCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [textareaInputPlaceholder, configureTextareaInputPlaceholder] =
    useSurveyQuestionComponentConfiguration(
      "placeholder",
      component,
      "",
      false
    );

  return (
    <Column>
      <Input
        label="Placeholder"
        value={textareaInputPlaceholder}
        onChange={configureTextareaInputPlaceholder}
      />
    </Column>
  );
};

export default TextareaInputCreator;
