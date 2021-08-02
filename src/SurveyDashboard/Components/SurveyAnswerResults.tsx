import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { activeSurveyResultsRequest } from "../actions";
import { selectActiveSurveyResultsByQuestion } from "../selectors";
import { IParsedAnswer } from "../types";

const SurveyAnswerResults = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeSurveyResultsRequest());
  }, []);

  const answersByQuestion = selectActiveSurveyResultsByQuestion();

  const _renderQuestionAnswers = (
    answers: Array<IParsedAnswer>
  ): React.ReactNode =>
    answers.map((answer) => (
      <p key={`${answer.user}-${answer.answer}`}>
        {answer.user} - {answer.answer}
      </p>
    ));

  return (
    <div className="flex_center-col">
      <h1>Results</h1>
      {Object.keys(answersByQuestion).map((question) => (
        <div key={question}>
          <h3>{question}</h3>
          {_renderQuestionAnswers(answersByQuestion[question])}
        </div>
      ))}
    </div>
  );
};

export default SurveyAnswerResults;
