import { Component, createRef, RefObject } from "inferno";
import { connect } from "inferno-redux";
import * as Papa from "papaparse";
import { store } from "../../state/store";
import { BUTTON_TYPES } from "../../utils/constants";
import { actions } from "../../state/actions/actions";
import { Button } from "./button";

class HandlesComponent extends Component<{}, {}> {
    private uploadRef: RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);

        this.uploadRef = createRef();

        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addAxis = this.addAxis.bind(this);
        this.removeAxis = this.removeAxis.bind(this);
        this.uploadCSV = this.uploadCSV.bind(this);
        this.handleCSV = this.handleCSV.bind(this);
    }

    addRow() {
        return store.dispatch(actions.addRow());
    }

    removeRow() {
        return store.dispatch(actions.removeRow());
    }

    addAxis() {
        return store.dispatch(actions.addAxis());
    }

    removeAxis() {
        return store.dispatch(actions.removeAxis());
    }

    uploadCSV() {
        this.uploadRef.current.click();
    }

    handleCSV() {
        if (
            !this.uploadRef.current.files?.length ||
            this.uploadRef.current.files[0].type !== "text/csv"
        ) {
            return;
        }

        const csvFile = this.uploadRef.current.files[0] as File;

        Papa.parse(csvFile, {
            delimiter: ",",
            newline: "",
            header: false,
            dynamicTyping: true,
            complete: (result) => {
                if (result?.data?.length) {
                    const tableUpdate: string[][] = result.data.map(row =>
                        row.filter(item =>
                            typeof item === "string" || typeof item === "number")
                            .map(item => item.toString())
                    );
                    store.dispatch(actions.cleanTable());
                    store.dispatch(actions.updateTable(tableUpdate));
                }
            }
        });
    }

    render() {
        return (
            <div className="handles">
                <div className="handle-buttons">
                    <div className="handle-buttons-title">Rows:</div>
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.ADD_ROW}
                        name={"+"}
                        action={this.addRow}
                    />
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.REMOVE_ROW}
                        name={"-"}
                        action={this.removeRow}
                    />
                </div>
                <div className="handle-buttons">
                    <div className="handle-buttons-title">Axes:</div>
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.ADD_AXIS}
                        name={"+"}
                        action={this.addAxis}
                    />
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.REMOVE_AXIS}
                        name={"-"}
                        action={this.removeAxis}
                    />
                </div>
                <div className="handle-upload" title="maximum size: 10 rows, 10 axes; minimum: 3 rows, 3 axes;">
                    <a href="example.csv">Download example</a>
                    <input
                        ref={this.uploadRef}
                        type="file"
                        id="upload"
                        multiple={false}
                        onChange={this.handleCSV}
                    />
                    <Button
                        disabled={false}
                        type={BUTTON_TYPES.UPLOAD_CSV}
                        name={"\u21A5 Upload data from CSV"}
                        action={this.uploadCSV}
                    />
                </div>
            </div>
        );
    }
}

export const Handles = connect()(HandlesComponent);
