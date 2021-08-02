import { ISurveyQuestionComponentConfiguration } from "../types/Question";
import { ISurveyCreationState } from "./reducer";

export interface ISurveyQuestionCreation {
  id: string;
  title: string;
  componentSchemaId: string;
  componentConfiguration: Array<ISurveyQuestionComponentConfiguration<unknown>>;
}

export type IConfigurableQuestionProperties = Omit<
  ISurveyQuestionCreation,
  "id"
>;

export type IConfigurableSurveyProperties = Pick<ISurveyCreationState, "title">;
