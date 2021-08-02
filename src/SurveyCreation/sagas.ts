import { all, call, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { IPublishSurveyRequest } from "./actions";
import * as t from "./actionTypes";
import api from "../utils/api";

export function* handlePublishSurveyRequest(action: IPublishSurveyRequest) {
  const { survey, resolve, reject } = action;

  try {
    const { ok }: ApiResponse<any> = yield call(api.post, "/Survey", survey);
    if (ok) {
      resolve();
      return;
    }
  } catch (e) {
    console.error(`Failed to complete survey publish request ${e}`);
  }

  reject();
}

export function* watchPublishSurveyRequest() {
  yield takeLatest(t.PUBLISH_SURVEY_REQUEST, handlePublishSurveyRequest);
}

export default function* () {
  yield all([watchPublishSurveyRequest()]);
}
