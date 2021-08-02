import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { updateSurveyQuestionAnswer } from "./actions";
import { selectSurveyQuestionAnswer } from "./selectors";

export const usePathParameters = <T>(): T => {
  const params = useParams<T>();
  const [pathParams, setPathParams] = useState(params);

  useEffect(() => {
    setPathParams(params);
  }, [params]);

  return pathParams;
};

type QuestionAnswerSetter<T> = (value: T) => void;

export const useSurveyQuestionAnswer = <T>(
  questionId: string,
  defaultValue: T
): [T, QuestionAnswerSetter<T>] => {
  const [answer, setAnswer] = useState<T>(defaultValue);

  const dispatch = useDispatch();
  const dispatchAnswerValueUpdate = (answer: T) =>
    dispatch(updateSurveyQuestionAnswer(questionId, answer));

  const questionAnswer = selectSurveyQuestionAnswer<T>(questionId);

  useEffect(() => {
    if (questionAnswer !== undefined) {
      setAnswer(questionAnswer);
    }
  }, [questionAnswer]);

  useEffect(() => {
    dispatchAnswerValueUpdate(answer);
  }, [answer]);

  return [answer, dispatchAnswerValueUpdate];
};
