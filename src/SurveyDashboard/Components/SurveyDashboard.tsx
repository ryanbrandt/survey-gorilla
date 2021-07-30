import { Divider, TabMenu } from "handsome-ui";

const SurveyDashboard = (): React.ReactElement => {
  return (
    <div>
      <h1 className="flex_center-col">Survey Dashboard</h1>
      <div>
        <TabMenu
          tabs={[
            { title: "Your Surveys", key: "owned" },
            { title: "Surveys You've Taken", key: "taken" },
          ]}
          onSearch={() => null}
          onTab={() => null}
        />
        <Divider solid />
      </div>
    </div>
  );
};

export default SurveyDashboard;
