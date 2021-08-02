import { IQuestion, IQuestionWithAnswer } from "./Question";

export interface ISurvey {
  id: string;
  title: string;
  created: string;
  modified: string;
}

export interface IFullSurvey extends ISurvey {
  questions: Array<IQuestion>;
}

export interface IFullSurveyWithAnswers extends ISurvey {
  questions: Array<IQuestionWithAnswer<unknown>>;
}
