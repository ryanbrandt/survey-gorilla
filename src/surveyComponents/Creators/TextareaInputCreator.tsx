import { Input } from "handsome-ui";

import { SurveyComponentProps } from "..";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";

const TextareaInputCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [textareaInputPlaceholder, configureTextareaInputPlaceholder] =
    useSurveyQuestionComponentConfiguration("placeholder", component, "");
  const [textareaHelpText, configureTextareaHelpText] =
    useSurveyQuestionComponentConfiguration("help", component, "");

  return (
    <>
      <Input
        label="Placeholder"
        value={textareaInputPlaceholder}
        onChange={configureTextareaInputPlaceholder}
      />
      <Input
        label="Help Text"
        value={textareaHelpText}
        onChange={configureTextareaHelpText}
      />
    </>
  );
};

export default TextareaInputCreator;
