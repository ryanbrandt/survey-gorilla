import { all, call, takeLatest } from "redux-saga/effects";

import { IPublishSurveyRequest } from "./actions";
import * as t from "./actionTypes";

import api from "../utils/api";

export function* handlePublishSurveyRequest(action: IPublishSurveyRequest) {
  const { survey, resolve, reject } = action;

  let success = false;
  try {
    const { ok }: { ok: boolean } = yield call(api.post, "/Survey", survey);
    if (ok) {
      success = true;
    }
  } catch (e) {
    console.error(`Failed to complete survey publish request ${e}`);
  }

  if (success) {
    resolve();
  } else {
    reject();
  }
}

export function* watchPublishSurveyRequest() {
  yield takeLatest(t.PUBLISH_SURVEY_REQUEST, handlePublishSurveyRequest);
}

export default function* () {
  yield all([watchPublishSurveyRequest()]);
}
