import { Component } from "inferno";
import { connect } from "inferno-redux";
import { selectors } from "../../state/selectors/selectors";
import { AxisDataState } from "../../state/types";
import { ROW_TYPES } from "../../utils/constants";
import { InlineEditor } from "../inlineEditor/inlineEditor";

interface TableHeaderProps {
    axisData: AxisDataState;
    labelsAxis: string;
};

class TableHeaderComponent extends Component<TableHeaderProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.axisData.order.map(axis =>
                    (<th className={axis === this.props.labelsAxis ? "label" : undefined}>
                        <InlineEditor
                            axis={axis}
                            rowId={ROW_TYPES.AXIS}
                            value={this.props.axisData[axis]}
                            disableValidation={true}
                        />
                    </th>)
                    )}
                </tr>
            </thead>
        );
    }
}

const mapStateToProps = (state, _ownProps: TableHeaderProps) => ({
    axisData: selectors.getAxisData(state),
    labelsAxis: selectors.getLabelsAxis(state),
});

export const TableHeader = connect(mapStateToProps)(TableHeaderComponent);
