import { Column, Select, Input } from "handsome-ui";

import { SurveyComponentProps } from "../../surveyComponentFactory";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";

const SingleLineInputComponentCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [singleLineInputType, configureSingleLineInputType] =
    useSurveyQuestionComponentConfiguration("type", component, "", true);

  return (
    <Column>
      <Select
        label="Input Type*"
        options={["text", "number", "date"]}
        value={singleLineInputType}
        onChange={configureSingleLineInputType}
        error={!singleLineInputType ? "This field is required" : ""}
      />
    </Column>
  );
};

export default SingleLineInputComponentCreator;
