import { Component, createRef, RefObject } from "inferno";
import { connect } from "inferno-redux";
import { Chart, registerables, ChartType } from "chart.js";
import {
    BORDER_COLOR,
    BUTTON_TYPES,
    COLORS,
    GRAPH_CHARTJS_TYPES,
    GRAPH_DATASET_OPTIONS,
    GRAPH_NAMES,
    GRAPH_OPTIONS,
    LINE_COLORS,
    LINE_GRAPH_TYPE
} from "../../utils/constants";
import { DropdownEditor } from "../inlineEditor/dropdownEditor";
import { Button } from "../handles/button";
import { selectors } from "../../state/selectors/selectors";
import { AxisDataState, RowDataState } from "../../state/types";

interface GraphBuilderProps {
    graphTypes: string[];
    labelsAxis: string;
    labels: string[];
    rowData: RowDataState;
    axisData: AxisDataState;
}

interface GraphBuilderStateProps {
    graphId: string;
    graphType: ChartType;
    isGraphReady: boolean;
}

Chart.register(...registerables);

class GraphBuilderComponent extends Component<GraphBuilderProps, GraphBuilderStateProps> {
    private graphRef: RefObject<HTMLCanvasElement>;
    private graph: any;

    constructor(props) {
        super(props);

        this.state = {
            graphId: "horizontalBarChart",
            graphType: GRAPH_CHARTJS_TYPES["horizontalBarChart"],
            isGraphReady: false,
        };

        this.graphRef = createRef();

        this.buildGraph = this.buildGraph.bind(this);
        this.downloadGraph = this.downloadGraph.bind(this);
        this.setGraphType = this.setGraphType.bind(this);
    }

    buildGraph() {
        if (this.graph) {
            this.graph.destroy();
        }

        const context = this.graphRef.current.getContext("2d");
        if (!context) {
            return undefined;
        }

        const { rowData, axisData, labelsAxis, labels } = this.props;

        const datasets = axisData.order.filter(axis =>
            axis !== labelsAxis).map((axis, index) => ({
                label: axisData[axis],
                data: rowData.order.map(id => rowData[id].cells[axis]),
                backgroundColor: COLORS[index],
                borderColor: this.state.graphType === LINE_GRAPH_TYPE ?
                    LINE_COLORS[index] : BORDER_COLOR,
                borderWidth: this.state.graphType === LINE_GRAPH_TYPE ? 2 : 1,
                ...GRAPH_DATASET_OPTIONS[this.state.graphId],
            }));

        this.graph = new Chart(context, {
            type: this.state.graphType,
            data: {
                labels,
                datasets,
            },
            options: {
                ...GRAPH_OPTIONS[this.state.graphId],
            }
        });

        this.setState({ isGraphReady: true });
    }

    downloadGraph() {
        const link = document.createElement("a");
        link.download = `graph-${Date.now()}.png`;
        link.href = this.graphRef.current.toDataURL();
        link.click();
    }

    setGraphType(graphId) {
        this.setState({ 
            graphId,
            graphType: GRAPH_CHARTJS_TYPES[graphId] 
        });
    }

    render() {
        return (
            <div className="graphBuilder">
                <div className="graphBuilder-top">
                    <div className="graphBuilder-title">Choose graph type:</div>
                    <DropdownEditor
                        graphTypes={this.props.graphTypes}
                        id={this.props.graphTypes[0]}
                        value={GRAPH_NAMES[this.props.graphTypes[0]]}
                        action={this.setGraphType}
                    />
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.BUILD_GRAPH}
                        name={"Build graph"}
                        action={this.buildGraph}
                    />
                </div>
                <div>
                    <canvas ref={this.graphRef} id="graph" />
                </div>
                {this.state.isGraphReady ?
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.DOWNLOAD_GRAPH}
                        name={"\u2B73 Download graph"}
                        action={this.downloadGraph}
                    /> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state, _ownProps: GraphBuilderProps) => ({
    graphTypes: selectors.getGraphTypes(state),
    labelsAxis: selectors.getLabelsAxis(state),
    labels: selectors.getLabels(state),
    rowData: selectors.getRowData(state),
    axisData: selectors.getAxisData(state),
});

export const GraphBuilder = connect(mapStateToProps)(GraphBuilderComponent);
