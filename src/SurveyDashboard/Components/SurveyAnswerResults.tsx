import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { activeSurveyResultsRequest } from "../actions";
import { selectActiveSurveyResultsByQuestion } from "../selectors";

const SurveyAnswerResults = (): React.ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeSurveyResultsRequest());
  }, []);

  const answersByQuestion = selectActiveSurveyResultsByQuestion();

  const _renderQuestionAnswers = (answers: any): any => {
    return answers.map((answer: any) => (
      <p key={answer.user}>
        {answer.user} - {answer.answer}
      </p>
    ));
  };

  return (
    <div className="flex_center-col">
      <h1>Results</h1>
      {Object.keys(answersByQuestion).map((question) => (
        <>
          <h3>{question}</h3>
          {_renderQuestionAnswers(answersByQuestion[question])}
        </>
      ))}
    </div>
  );
};

export default SurveyAnswerResults;
