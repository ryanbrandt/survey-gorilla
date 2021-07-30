import { Input } from "handsome-ui";

import { GENERIC_CREATION_ERROR } from "../constants";
import { useSurveyConfiguration } from "../hooks";
import { selectQuestions, selectSurveyId } from "../selectors";
import SurveyCreationButtonSection from "../Subcomponents/SurveyCreationButtonSection";

import SurveyQuestionCreation from "./SurveyQuestionCreation";

const SurveyCreation = (): React.ReactElement => {
  const [surveyConfiguration, setSurveyConfiguration] = useSurveyConfiguration({
    surveyTitle: "",
  });

  const { surveyTitle } = surveyConfiguration;

  const surveyId = selectSurveyId();
  const questions = selectQuestions();

  return (
    <div className="flex_center-col">
      <h1>Create a New Survey</h1>
      <Input
        label="Survey Title*"
        value={surveyTitle}
        onChange={(value: string) =>
          setSurveyConfiguration({ ...surveyConfiguration, surveyTitle: value })
        }
        error={!surveyTitle ? GENERIC_CREATION_ERROR : ""}
      />
      {questions.map((question, i) => (
        <SurveyQuestionCreation
          key={question.questionId}
          index={i}
          surveyId={surveyId}
          question={question}
        />
      ))}
      <SurveyCreationButtonSection />
    </div>
  );
};

export default SurveyCreation;
