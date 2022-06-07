import { render, Component } from "inferno";
import { Provider } from "inferno-redux";
import { store } from "./state/store";
import { Table } from "./components/table/table";
import { Handles } from "./components/handles/handles";
import { GraphBuilder } from "./components/graphBuilder/graphBuilder";

import "./app.scss";

interface StateProps {
  axis: string[];
  rows: number;
  columns: number;
  rowData: { cellValues: string[] }[];
  isDataValid: boolean;
};

interface OwnProps { }

class App extends Component<OwnProps, StateProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Graph builder app</h1>
        <div class="app-wrapper">
          <div class="left">
            <Handles />
            <div class="table-wrapper">
              <Table />
            </div>
          </div>
          <div class="right">
            <GraphBuilder
              graphTypes={[]}
              labels={[]}
              rowData={undefined}
              axisData={undefined}
              labelsAxis={""}
            />
          </div>
        </div>
      </>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);