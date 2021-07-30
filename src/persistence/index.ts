import { useEffect } from "react";
import { ISurveyComponent } from "../surveyComponentFactory";

export type PersistedFieldSetter<T> = (value: T) => void;

export const useSurveyComponentPersistence = <T>(
  fieldName: string,
  component: ISurveyComponent,
  defaultValue: T
): [T, PersistedFieldSetter<T>] => {
  return [defaultValue, (T) => null];
};
