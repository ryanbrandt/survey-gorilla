import { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

import { Button, LoadingOverlay, Row } from "handsome-ui";

import { addSurveyQuestion, publishSurveyRequest } from "../actions";
import { selectSurveyCanBePublished } from "../selectors";
import { ONE_SECOND_MS } from "../../utils/constants";

import ErrorAndSuccessSection from "../../common/Components/ErrorAndSuccessSection";
import { usePromisifedDispatch } from "../../utils/hooks";

const SurveyCreationButtonSection = (): React.ReactElement => {
  const dispatch = useDispatch();
  const dispatchAddQuestion = () => dispatch(addSurveyQuestion());

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const canPublish = selectSurveyCanBePublished();

  const onPublishSurveyClick = usePromisifedDispatch(publishSurveyRequest, {
    onStart: () => {
      setProcessing(true);
      setSuccessMessage(undefined);
      setErrorMessage(undefined);
    },
    onThen: () => setSuccessMessage("Successfully published survey!"),
    onError: () => setErrorMessage("Failed to publish survey"),
    onEnd: () => setProcessing(false),
  });

  const onDebouncedPublishSurveyClick = debounce(
    onPublishSurveyClick,
    ONE_SECOND_MS / 2
  );

  return (
    <div className="survey_creation-button_container">
      <Row version="space-between">
        <Button
          className="survey_creation-button"
          title="Add Question"
          onClick={dispatchAddQuestion}
          inverting
          round
        />
        <Button
          className="survey_creation-button"
          title="Publish Survey"
          onClick={onDebouncedPublishSurveyClick}
          disabled={!(canPublish || processing)}
          inverting
          round
        />
      </Row>
      <ErrorAndSuccessSection
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <LoadingOverlay show={processing} message="Publishing Survey..." />
    </div>
  );
};

export default SurveyCreationButtonSection;
