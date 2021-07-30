import { Provider } from "react-redux";

import configureStore from "../../store/store";
import RootContainer from "./RootContainer";

import "handsome-ui/lib/index.css";

const App = (): React.ReactElement => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <div className="App">
        <RootContainer />
      </div>
    </Provider>
  );
};

export default App;
