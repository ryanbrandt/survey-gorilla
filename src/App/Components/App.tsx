import { Provider } from "react-redux";

import store from "../../store/store";
import RootContainer from "./RootContainer";

import "handsome-ui/lib/index.css";

const App = (): React.ReactElement => (
  <Provider store={store}>
    <div className="App">
      <RootContainer />
    </div>
  </Provider>
);

export default App;
