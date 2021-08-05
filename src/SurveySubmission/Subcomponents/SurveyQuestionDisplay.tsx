import { createElement } from "react";

import {
  surveyComponentFactory,
  componentConfigurationToProps,
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

    const questionComponent = surveyComponentFactory(componentSchemaId);

    if (questionComponent) {
      const questionComponentProps = componentConfigurationToProps(
        componentConfiguration
      );

      return createElement(questionComponent, {
        ...questionComponentProps,
        component: { questionId: id, componentSchemaId },
      });
    }

    return <div>Unable to render component</div>;
  };

  return (
    <div className="question_answer-section">
      <h3>{title}*</h3>
      {_renderQuestionComponent()}
    </div>
  );
};

export default SurveyQuestionDisplay;
