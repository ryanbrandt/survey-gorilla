import {
  Table,
  TableRow,
  TableCell,
  Dropdown,
  Column,
  Button,
  Row,
} from "handsome-ui";
import { useDispatch } from "react-redux";
import { history } from "../../routes";
import { ISurvey } from "../../types/Survey";
import {
  openWindow,
  utcDateStringToLocaleDateTimeString,
} from "../../utils/helpers";
import { setActiveSurvey } from "../actions";
import { selectOwnedSurveys } from "../selectors";

const OwnedSurveyResults = (): React.ReactElement => {
  const ownedSurveys = selectOwnedSurveys();

  const dispatch = useDispatch();

  const onRowClick = (surveyId: string) => {
    dispatch(setActiveSurvey(surveyId));

    history.push(`/results/${surveyId}`);
  };

  const _renderDropdownContent = (survey: ISurvey): React.ReactNode => {
    const { location } = window;
    const { host } = location;

    const { id, created, modified } = survey;
    const surveyLink = `http://${host}/take/${id}`;

    return (
      <Row version="space-between">
        <Column>
          <div>
            <h5>Shareable Link</h5>
            <a
              className="app-link dashboard-link"
              onClick={() => openWindow(surveyLink)}
            >
              {surveyLink}
            </a>
          </div>
          <div>
            <h5>Created</h5>
            {utcDateStringToLocaleDateTimeString(created)}
          </div>
        </Column>
        <Column>
          <div>
            <h5>Last Modified</h5>
            {utcDateStringToLocaleDateTimeString(modified)}
          </div>
        </Column>
      </Row>
    );
  };

  return (
    <div className="flex_center-col">
      <Table className="dashboard_table" headers={[]}>
        {ownedSurveys.map((survey, i) => (
          <TableRow key={survey.id} darkened={i % 2 === 0}>
            <TableCell className="dashboard_table-container">
              <Dropdown heading={survey.title}>
                {_renderDropdownContent(survey)}
                <div className="dashboard_results-btn-container">
                  <Button
                    title="View Results"
                    className="dashboard_results-btn"
                    onClick={() => onRowClick(survey.id)}
                    round
                    inverting
                  />
                </div>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default OwnedSurveyResults;
