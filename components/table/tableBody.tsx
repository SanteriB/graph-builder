import { Component } from "inferno";
import { connect } from "inferno-redux";
import { selectors } from "../../state/selectors/selectors";
import { RowDataState } from "../../state/types";
import { TableBodyRow } from "./tableBodyRow";

interface TableBodyProps {
    rowData: RowDataState;
    labelsAxis: string;
};

class TableBodyComponent extends Component<TableBodyProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tbody>
                {this.props.rowData.order.map(rowId =>
                    (<TableBodyRow 
                        cells={this.props.rowData[rowId].cells} 
                        id={rowId} 
                        disableValidation={false}
                        labelsAxis={this.props.labelsAxis}
                    />)
                )}
            </tbody>
        );
    }
}

const mapStateToProps = (state, _ownProps: TableBodyProps) => ({
    rowData: selectors.getRowData(state),
    labelsAxis: selectors.getLabelsAxis(state),
});

export const TableBody = connect(mapStateToProps)(TableBodyComponent);
