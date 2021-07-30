import { Input, Button } from "handsome-ui";

import {
  selectQuestions,
  selectSurveyCanBePublished,
  selectSurveyId,
} from "../selectors";

import SurveyQuestionCreation from "./SurveyQuestionCreation";

const SurveyCreation = (): React.ReactElement => {
  const surveyId = selectSurveyId();
  const questions = selectQuestions();

  const canPublish = selectSurveyCanBePublished();

  return (
    <div className="flex_center-col">
      <h2>Create a New Survey</h2>
      <Input label="Survey Title*" />
      {questions.map((question, i) => (
        <SurveyQuestionCreation
          key={question.questionId}
          index={i}
          surveyId={surveyId}
          question={question}
        />
      ))}
      <Button
        title="Publish Survey"
        onClick={() => null}
        disabled={!canPublish}
        inverting
        round
      />
    </div>
  );
};

export default SurveyCreation;
