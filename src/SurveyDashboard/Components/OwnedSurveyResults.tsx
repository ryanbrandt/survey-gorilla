import { Table, TableRow, TableCell } from "handsome-ui";
import { useDispatch } from "react-redux";
import { history } from "../../routes";
import { setActiveSurvey } from "../actions";
import { selectOwnedSurveys } from "../selectors";

const OwnedSurveyResults = (): React.ReactElement => {
  const ownedSurveys = selectOwnedSurveys();
  const { location } = window;
  const { host } = location;

  const dispatch = useDispatch();

  const onRowClick = (surveyId: string) => {
    dispatch(setActiveSurvey(surveyId));

    history.push(`/results/${surveyId}`);
  };

  return (
    <Table className="results-table" headers={["Title", "Shareable Link"]}>
      {ownedSurveys.map((survey, i) => (
        <TableRow key={survey.id} darkened={i % 2 === 0}>
          <TableCell>{survey.title}</TableCell>
          <TableCell>{`http://${host}/take/${survey.id}`}</TableCell>
          <TableCell>
            <a className="app-link" onClick={() => onRowClick(survey.id)}>
              View Results
            </a>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default OwnedSurveyResults;
