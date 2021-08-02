import { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

import { Button, LoadingOverlay, Row } from "handsome-ui";

import { addSurveyQuestion, publishSurveyRequest } from "../actions";
import { selectSurvey, selectSurveyCanBePublished } from "../selectors";

const SurveyCreationButtonSection = (): React.ReactElement => {
  const dispatch = useDispatch();
  const dispatchAddQuestion = () => dispatch(addSurveyQuestion());

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const canPublish = selectSurveyCanBePublished();
  const survey = selectSurvey();

  const onPublishSurveyClick = debounce(async (): Promise<void> => {
    setProcessing(true);

    await new Promise((resolve, reject) => {
      dispatch(publishSurveyRequest(survey, resolve, reject));
    })
      .then(() => setSuccessMessage("Successfully published survey!"))
      .catch(() => setErrorMessage("Failed to publish survey"))
      .finally(() => setProcessing(false));
  }, 500);

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
          onClick={onPublishSurveyClick}
          disabled={!(canPublish || processing)}
          inverting
          round
        />
      </Row>
      {successMessage && <label>{successMessage}</label>}
      {errorMessage && <label>{errorMessage}</label>}
      <LoadingOverlay show={processing} message="Publishing Survey..." />
    </div>
  );
};

export default SurveyCreationButtonSection;
