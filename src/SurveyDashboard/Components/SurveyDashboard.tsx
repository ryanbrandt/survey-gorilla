import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Divider, TabMenu } from "handsome-ui";
import { listOwnedSurveysRequest } from "../actions";
import OwnedSurveyResults from "./OwnedSurveyResults";

enum SURVEY_DASHBOARD_TABS {
  owned = "owned",
  taken = "taken",
}

const SurveyDashboard = (): React.ReactElement => {
  // ryan@test.com, hardcoded for demoing
  const userId = "427de2f7-3aed-46a5-9cbf-c871354bed32";

  const [activeTab, setActiveTab] = useState<SURVEY_DASHBOARD_TABS>(
    SURVEY_DASHBOARD_TABS.owned
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOwnedSurveysRequest(userId));
  }, [userId]);

  const TABS = [
    {
      title: "Your Surveys",
      key: SURVEY_DASHBOARD_TABS.owned,
      active: activeTab === SURVEY_DASHBOARD_TABS.owned,
    },
    {
      title: "Surveys You've Taken",
      key: SURVEY_DASHBOARD_TABS.taken,
      active: activeTab === SURVEY_DASHBOARD_TABS.taken,
    },
  ];

  return (
    <div>
      <h1 className="flex_center-col">Survey Dashboard</h1>
      <div>
        <TabMenu tabs={TABS} onSearch={() => null} onTab={() => null} />
        <Divider solid />
        <OwnedSurveyResults />
      </div>
    </div>
  );
};

export default SurveyDashboard;
