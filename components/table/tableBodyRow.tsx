import { Component } from "inferno";
import { store } from "../../state/store";
import { actions } from "../../state/actions/actions";
import { selectors } from "../../state/selectors/selectors";
import { VALIDATION_STATUS } from "../../utils/constants";
import { InlineEditor } from "../inlineEditor/inlineEditor";
import { validateRow } from "../../utils/validationUtil";

interface TableBodyRowProps {
    id: string;
    cells: { [axis: string]: string };
    disableValidation: boolean;
    labelsAxis: string;
};
interface TableBodyRowStateProps {
    isValid: boolean;
};

export class TableBodyRow extends Component<TableBodyRowProps, TableBodyRowStateProps> {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
        };

        this.validateRow = this.validateRow.bind(this);
    }

    validateRow() {
        if (!this.props.disableValidation) {
            const row = selectors.getRowById(store.getState(), this.props.id);
            const isValid = validateRow(row, this.props.labelsAxis);
            store.dispatch(actions.validateRow({
                id: this.props.id,
                isValid
            }));

            const rowData = selectors.getRowData(store.getState());
            const isTableValid = rowData.order.every(id => rowData[id].isValid);
            store.dispatch(actions.validateTable(isTableValid));

            this.setState({ isValid });
        }
    }

    render() {
        return (
            <tr
                data-id={this.props.id}
                onChange={this.validateRow}
                className={this.state.isValid ?
                    `row-${VALIDATION_STATUS.VALID}` :
                    `row-${VALIDATION_STATUS.INVALID}`
                }
            >
                {
                    Object.keys(this.props.cells).map(axis =>
                    (<td className={axis === this.props.labelsAxis ? "label" : undefined}>
                        <InlineEditor
                            axis={axis}
                            rowId={this.props.id}
                            value={this.props.cells[axis]}
                            disableValidation={axis === this.props.labelsAxis}
                        />
                    </td>)
                    )
                }
            </tr>
        );
    }
}

