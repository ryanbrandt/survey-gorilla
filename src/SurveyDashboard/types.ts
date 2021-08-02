export interface ISurveyQuestionAnswer {
  values: {
    value: string;
  };
  user: {
    id: string;
    email: string;
  };
  question: {
    id: string;
    title: string;
  };
}

export interface IParsedAnswer {
  user: string;
  answer: string;
}

export interface ISurveyAnswersByQuestion {
  [key: string]: Array<IParsedAnswer>;
}
