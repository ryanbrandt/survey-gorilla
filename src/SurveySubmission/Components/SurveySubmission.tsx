import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

import { Button, LoadingOverlay } from "handsome-ui";

import { retrieveSurveyByIdRequest, submitSurveyRequest } from "../actions";
import { usePathParameters } from "../hooks";
import { selectSurveyCanBeSubmitted, selectSurveyToTake } from "../selectors";
import { ONE_SECOND_MS } from "../../utils/constants";

import SurveyQuestionDisplay from "../Subcomponents/SurveyQuestionDisplay";
import ErrorAndSuccessSection from "../../common/Components/ErrorAndSuccessSection";
import { usePromisifedDispatch } from "../../utils/hooks";

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

  const onSurveySubmission = usePromisifedDispatch(submitSurveyRequest, {
    onStart: () => {
      setProcessing(true);
      setSuccessMessage(undefined);
      setErrorMessage(undefined);
    },
    onThen: () => setSuccessMessage("Successfully submitted answers!"),
    onError: () => setErrorMessage("Failed to submit answers"),
    onEnd: () => setProcessing(false),
  });

  const onDebouncedSurveySubmission = debounce(
    onSurveySubmission,
    ONE_SECOND_MS / 2
  );

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
        onClick={onDebouncedSurveySubmission}
        disabled={!canSubmit}
        round
        inverting
      />
      <ErrorAndSuccessSection
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <LoadingOverlay show={processing} message="Submitting Answers..." />
    </div>
  );
};

export default SurveySubmission;
