/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, call, select, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { IPublishSurveyRequest } from "./actions";
import * as t from "./actionTypes";
import api from "../utils/api";
import { RootState } from "../store/rootReducer";
import { ISurveyCreationState } from "./reducer";

export function* handlePublishSurveyRequest(action: IPublishSurveyRequest) {
  const { resolve, reject } = action;

  try {
    const survey: ISurveyCreationState = yield select(
      (state: RootState) => state.surveyCreation
    );
    const { ok }: ApiResponse<void> = yield call(api.post, "/Survey", survey);
    if (ok) {
      resolve();
      return;
    }
  } catch (e) {
    console.error(e);
  }

  reject();
}

export function* watchPublishSurveyRequest() {
  yield takeLatest(t.PUBLISH_SURVEY_REQUEST, handlePublishSurveyRequest);
}

export default function* () {
  yield all([watchPublishSurveyRequest()]);
}
