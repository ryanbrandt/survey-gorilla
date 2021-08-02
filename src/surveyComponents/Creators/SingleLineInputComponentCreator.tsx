import { Column, Select, Input } from "handsome-ui";

import { SurveyComponentProps } from "..";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";
import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";

const SingleLineInputComponentCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [singleLineInputType, configureSingleLineInputType] =
    useSurveyQuestionComponentConfiguration("type", component, "", true);

  const [singleLineInputHelpText, configureSingleInputHelpText] =
    useSurveyQuestionComponentConfiguration("help", component, "");

  return (
    <Column>
      <Select
        label="Input Type*"
        options={["text", "number", "date"]}
        value={singleLineInputType}
        onChange={configureSingleLineInputType}
        error={!singleLineInputType ? GENERIC_REQUIRED_ERROR : ""}
      />
      <Input
        label="Help Text"
        value={singleLineInputHelpText}
        onChange={configureSingleInputHelpText}
      />
    </Column>
  );
};

export default SingleLineInputComponentCreator;
