export interface ISurveyQuestionComponentConfiguration<T> {
  name: string;
  value: T;
  required?: boolean;
}

export interface IQuestion {
  id: string;
  title: string;
  componentSchemaId: string;
  componentConfiguration: Array<ISurveyQuestionComponentConfiguration<unknown>>;
}

export interface IQuestionWithAnswer<T> extends IQuestion {
  answer?: T;
}
