import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

import { Button, LoadingOverlay } from "handsome-ui";

import { retrieveSurveyByIdRequest, submitSurveyRequest } from "../actions";
import { usePathParameters } from "../hooks";
import { selectSurveyCanBeSubmitted, selectSurveyToTake } from "../selectors";
import SurveyQuestionDisplay from "../Subcomponents/SurveyQuestionDisplay";

const SurveySubmission = (): React.ReactElement => {
  const pathParameters = usePathParameters<{ id: string }>();

  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = pathParameters;
    dispatch(retrieveSurveyByIdRequest(id));
  }, [pathParameters]);

  const survey = selectSurveyToTake();
  const canSubmit = selectSurveyCanBeSubmitted();

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const onSurveySubmission = debounce(async (): Promise<void> => {
    if (survey) {
      setProcessing(true);
      await new Promise((resolve, reject) => {
        dispatch(submitSurveyRequest(survey, resolve, reject));
      })
        .then(() => setSuccessMessage("Successfully submitted answers!"))
        .catch(() => setErrorMessage("Failed to submit answers"))
        .finally(() => setProcessing(false));
    }
  }, 500);

  if (!survey) {
    return (
      <div className="flex_center-col">
        <h1>Survey not found!</h1>
      </div>
    );
  }

  const { title, questions } = survey;

  return (
    <div className="flex_center-col">
      <h1>{title}</h1>
      {questions.map((question) => (
        <SurveyQuestionDisplay key={question.id} question={question} />
      ))}
      <Button
        title="Submit Answers"
        onClick={onSurveySubmission}
        disabled={!canSubmit}
        round
        inverting
      />
      {successMessage && <label>{successMessage}</label>}
      {errorMessage && <label>{errorMessage}</label>}
      <LoadingOverlay show={processing} message="Submitting Answers..." />
    </div>
  );
};

export default SurveySubmission;
