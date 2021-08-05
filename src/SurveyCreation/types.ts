import { IQuestion } from "../types/Question";
import { ISurveyCreationState } from "./reducer";

export type IConfigurableQuestionProperties = Omit<IQuestion, "id">;

export type IConfigurableSurveyProperties = Pick<ISurveyCreationState, "title">;
