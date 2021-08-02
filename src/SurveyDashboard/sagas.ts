import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { RootState } from "../store/rootReducer";
import api from "../utils/api";
import {
  activeSurveyResultsSuccess,
  IListOwnedSurveysRequest,
  listOwnedSurveysSuccess,
} from "./actions";
import * as t from "./actionTypes";

export function* handleActiveSurveyResultsRequest() {
  const surveyId: string = yield select(
    (state: RootState) => state.surveyDashboard.activeSurvey
  );

  try {
    const { data, ok }: { data: any; ok: boolean } = yield call(
      api.get,
      `/Survey/${surveyId}/Answer`
    );

    if (ok) {
      yield put(activeSurveyResultsSuccess(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchActiveSurveyResultsRequest() {
  yield takeLatest(
    t.ACTIVE_SURVEY_RESULTS_REQUEST,
    handleActiveSurveyResultsRequest
  );
}

export function* handleListOwnedSurveysRequest(
  action: IListOwnedSurveysRequest
) {
  const { userId } = action;

  try {
    const { data, ok }: { data: any; ok: boolean } = yield call(
      api.get,
      `/User/${userId}/Survey`
    );

    if (ok && data) {
      yield put(listOwnedSurveysSuccess(data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchListOwnedSurveysRequest() {
  yield takeLatest(t.LIST_OWNED_SURVEYS_REQUEST, handleListOwnedSurveysRequest);
}

export default function* () {
  yield all([
    watchListOwnedSurveysRequest(),
    watchActiveSurveyResultsRequest(),
  ]);
}
