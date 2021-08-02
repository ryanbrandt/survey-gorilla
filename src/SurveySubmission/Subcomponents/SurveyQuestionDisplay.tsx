import { createElement } from "react";

import surveyComponentFactory, {
  surveyQuestionComponentConfigurationToProps,
} from "../../surveyComponents";
import { IQuestion } from "../../types/Question";

interface Props {
  question: IQuestion;
}

const SurveyQuestionDisplay = (props: Props): React.ReactElement => {
  const { question } = props;

  const { id, title } = question;

  const _renderQuestionComponent = (): React.ReactElement => {
    const { componentSchemaId, componentConfiguration } = question;

    const questionComponent = surveyComponentFactory({
      componentSchemaId,
      questionId: id,
    });

    if (questionComponent) {
      const props = surveyQuestionComponentConfigurationToProps(
        componentConfiguration
      );
      return createElement(questionComponent, {
        ...props,
        component: { questionId: id },
      });
    }

    return <div>Unable to render component</div>;
  };

  return (
    <div className="question_answer-section">
      <h2>{title}*</h2>
      {_renderQuestionComponent()}
    </div>
  );
};

export default SurveyQuestionDisplay;
