import { useSurveyConfiguration } from "../hooks";
import { selectQuestions } from "../selectors";

import SurveyCreationButtonSection from "../Subcomponents/SurveyCreationButtonSection";
import RequiredInput from "../../common/Components/RequiredInput";
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
      <RequiredInput
        label="Survey Title*"
        value={title}
        onChange={(value: string) =>
          setSurveyConfiguration({ ...surveyConfiguration, title: value })
        }
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
