import { Button, Row } from "handsome-ui";
import { useDispatch } from "react-redux";
import { addSurveyQuestion } from "../actions";
import { selectSurveyCanBePublished } from "../selectors";

const SurveyCreationButtonSection = () => {
  const dispatch = useDispatch();
  const dispatchAddQuestion = () => dispatch(addSurveyQuestion());

  const canPublish = selectSurveyCanBePublished();

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
          onClick={() => null}
          disabled={!canPublish}
          inverting
          round
        />
      </Row>
    </div>
  );
};

export default SurveyCreationButtonSection;
