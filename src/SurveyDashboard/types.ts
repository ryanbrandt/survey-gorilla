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
