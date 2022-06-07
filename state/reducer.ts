import { produce } from "immer";
import {
    DEFAULT_VALUE,
    DEFAULT_LABEL,
    GRAPH_TYPES,
    MAX_AXIS_NUMBER,
    MAX_ROW_NUMBER
} from "../utils/constants";
import { Action, AxisDataState, RowDataState, State } from "./types";
import { actionTypes } from "./actions/actionTypes";

export const initialState: any = {
    graphTypes: GRAPH_TYPES,
    axisData: {
        "axis-0": "Labels",
        "axis-1": "Axis 1",
        "axis-2": "Axis 2",
        "axis-3": "Axis 3",
        order: ["axis-0", "axis-1", "axis-2", "axis-3"],
    },
    labelsAxis: "axis-0",
    rowData: {
        "row-0": {
            cells: {
                "axis-0": DEFAULT_LABEL,
                "axis-1": DEFAULT_VALUE,
                "axis-2": DEFAULT_VALUE,
                "axis-3": DEFAULT_VALUE,
            },
            isValid: true,
        },
        "row-1": {
            cells: {
                "axis-0": DEFAULT_LABEL,
                "axis-1": DEFAULT_VALUE,
                "axis-2": DEFAULT_VALUE,
                "axis-3": DEFAULT_VALUE,
            },
            isValid: true,
        },
        "row-2": {
            cells: {
                "axis-0": DEFAULT_LABEL,
                "axis-1": DEFAULT_VALUE,
                "axis-2": DEFAULT_VALUE,
                "axis-3": DEFAULT_VALUE,
            },
            isValid: true,
        },
        "row-3": {
            cells: {
                "axis-0": DEFAULT_LABEL,
                "axis-1": DEFAULT_VALUE,
                "axis-2": DEFAULT_VALUE,
                "axis-3": DEFAULT_VALUE,
            },
            isValid: true,
        },
        order: ["row-0", "row-1", "row-2", "row-3"],
    },
    isValid: true,
};

export const reducer = produce((draft: State = initialState, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        /* VALIDATION */
        case actionTypes.TABLE_VALIDATE: {
            draft.isValid = payload;
            return draft;
        }
        case actionTypes.ROW_VALIDATE: {
            const { id, isValid } = payload;
            draft.rowData[id].isValid = isValid;

            return draft;
        }
        /* UPDATE VALUES */
        case actionTypes.TABLE_CLEAN: {
            draft.axisData = { order: [] };
            draft.rowData = { order: [] };

            return draft;
        }
        case actionTypes.TABLE_UPDATE: {
            const newAxisdata: AxisDataState = { order: [] };
            const newRowData: RowDataState = { order: [] };

            const axisArray = payload[0].length <= MAX_AXIS_NUMBER ?
                payload[0] : payload[0].slice(0, MAX_AXIS_NUMBER);

            axisArray.forEach((value, index) => {
                const id = `axis-${index}`;
                newAxisdata[id] = value;
                newAxisdata.order.push(id);
            });

            // adding 1 because we don't count header in MAX_ROW_NUMBER
            const rowsArray = payload.length <= MAX_ROW_NUMBER + 1 ?
                payload.slice(1) : payload.slice(1, MAX_ROW_NUMBER + 1);

            for (let itemIndex = 0; itemIndex < rowsArray.length; itemIndex++) {
                const rowId = `row-${itemIndex}`;
                newRowData[rowId] = { cells: {}, isValid: true };
                newRowData.order.push(rowId);

                const rowAxisArray = rowsArray[itemIndex].length <= MAX_AXIS_NUMBER ?
                    rowsArray[itemIndex] : rowsArray[itemIndex].slice(0, MAX_AXIS_NUMBER);

                rowAxisArray.forEach((value, index) => {
                    const id = `axis-${index}`;
                    newRowData[rowId].cells[id] = value;
                });
            }

            draft.axisData = newAxisdata;
            draft.rowData = newRowData;

            return draft;
        }
        case actionTypes.CELL_VALUE_UPDATE: {
            const { rowId, axis, value } = payload;
            draft.rowData[rowId].cells[axis] = value;

            return draft;
        }
        case actionTypes.AXIS_VALUE_UPDATE: {
            const { axis, value } = payload;
            draft.axisData[axis] = value;
            return draft;
        }
        /* ADD/REMOVE ACTIONS */
        case actionTypes.ROW_ADD: {
            const newRowId = `row-${draft.rowData.order.length}`;

            draft.rowData.order.push(newRowId);
            draft.rowData[newRowId] = {
                cells: {},
                isValid: true,
            };
            draft.axisData.order.forEach(axisId => {
                draft.rowData[newRowId].cells[axisId] = axisId === draft.labelsAxis ?
                    DEFAULT_LABEL : DEFAULT_VALUE;
            });

            return draft;
        }
        case actionTypes.ROW_REMOVE: {
            const deletedRowId = draft.rowData.order.pop();
            delete draft.rowData[deletedRowId];

            return draft;
        }
        case actionTypes.AXIS_ADD: {
            const newAxisId = `axis-${draft.axisData.order.length}`;

            draft.axisData.order.push(newAxisId);
            draft.axisData[newAxisId] = "New Axis";
            draft.rowData.order.forEach(rowId => {
                draft.rowData[rowId].cells[newAxisId] = DEFAULT_VALUE;
            });

            return draft;
        }
        case actionTypes.AXIS_REMOVE: {
            const deletedAxisId = draft.axisData.order.pop();
            delete draft.axisData[deletedAxisId];

            draft.rowData.order.forEach(rowId => {
                delete draft.rowData[rowId].cells[deletedAxisId];
            });

            return draft;
        }
        default: {
            return draft;
        }
    }
});