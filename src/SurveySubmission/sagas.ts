import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../utils/api";
import {
  IRetrieveSurveyByIdRequest,
  ISubmitSurveyRequest,
  retrieveSurveyByIdSuccess,
} from "./actions";

import * as t from "./actionTypes";

export function* handleSubmitSurveyRequest(action: ISubmitSurveyRequest) {
  const { survey, resolve, reject } = action;
  const { questions } = survey;

  const surveyAnswerPayload = questions.map((question) => ({
    values: { value: question.answer },
    // hardcoded to you@test.com for demoing
    userId: "ae1c48b1-6a38-4e00-a453-3e36a3980f28",
    questionId: question.id,
  }));

  try {
    const { ok }: { ok: boolean } = yield call(
      api.post,
      `/Survey/${survey.id}/Answer`,
      surveyAnswerPayload
    );

    if (ok) {
      resolve();
      return;
    }
  } catch (e) {
    console.log(e);
  }

  reject();
}
export function* watchSubmitSurveyRequest() {
  yield takeLatest(t.SUBMIT_SURVEY_REQUEST, handleSubmitSurveyRequest);
}

export function* handleRetrieveSurveyByIdRequest(
  action: IRetrieveSurveyByIdRequest
) {
  const { id } = action;

  try {
    const { data, ok }: { data: any; ok: boolean } = yield call(
      api.get,
      `/Survey/${id}`
    );

    if (ok && data) {
      yield put(retrieveSurveyByIdSuccess(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchRetrieveSurveyByIdRequest() {
  yield takeLatest(t.RETRIEVE_SURVEY_BY_ID, handleRetrieveSurveyByIdRequest);
}

export default function* () {
  yield all([watchRetrieveSurveyByIdRequest(), watchSubmitSurveyRequest()]);
}
