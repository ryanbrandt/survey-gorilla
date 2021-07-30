import { Column, Select, Input } from "handsome-ui";

import { SurveyComponentProps } from "../../surveyComponentFactory";
import { useSurveyQuestionComponentConfiguration } from "../../SurveyCreation/hooks";

const SingleLineInputComponentCreator = ({
  component,
}: SurveyComponentProps): JSX.Element => {
  const [inputType, configureInputType] =
    useSurveyQuestionComponentConfiguration("type", component, "", true);

  return (
    <Column>
      <Select
        label="Input Type*"
        options={["text", "number", "date"]}
        value={inputType}
        onChange={configureInputType}
      />
      <Input label="Placeholder" value="" onChange={() => null} />
    </Column>
  );
};

export default SingleLineInputComponentCreator;
