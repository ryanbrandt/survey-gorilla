import { Input } from "handsome-ui";

import { SurveyComponentProps } from "..";
import RequiredSelect from "../../common/Components/RequiredSelect";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";

const SingleLineInputComponentCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [singleLineInputType, configureSingleLineInputType] =
    useSurveyQuestionComponentConfiguration("type", component, "", true);

  const [singleLineInputHelpText, configureSingleInputHelpText] =
    useSurveyQuestionComponentConfiguration("help", component, "");

  return (
    <>
      <RequiredSelect
        label="Input Type*"
        options={["text", "number", "date"]}
        value={singleLineInputType}
        onChange={configureSingleLineInputType}
      />
      <Input
        label="Help Text"
        value={singleLineInputHelpText}
        onChange={configureSingleInputHelpText}
      />
    </>
  );
};

export default SingleLineInputComponentCreator;
