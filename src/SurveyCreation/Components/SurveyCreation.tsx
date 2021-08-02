import { Input } from "handsome-ui";

import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";
import { useSurveyConfiguration } from "../hooks";
import { selectQuestions } from "../selectors";
import SurveyCreationButtonSection from "../Subcomponents/SurveyCreationButtonSection";

import SurveyQuestionCreation from "./SurveyQuestionCreation";

const SurveyCreation = (): React.ReactElement => {
  const [surveyConfiguration, setSurveyConfiguration] = useSurveyConfiguration({
    title: "",
  });

  const { title } = surveyConfiguration;

  const questions = selectQuestions();

  return (
    <div className="flex_center-col">
      <h1>Create a New Survey</h1>
      <Input
        label="Survey Title*"
        value={title}
        onChange={(value: string) =>
          setSurveyConfiguration({ ...surveyConfiguration, title: value })
        }
        error={!title ? GENERIC_REQUIRED_ERROR : ""}
      />
      {questions.map((question, i) => (
        <SurveyQuestionCreation
          key={question.id}
          index={i}
          question={question}
        />
      ))}
      <SurveyCreationButtonSection />
    </div>
  );
};

export default SurveyCreation;
