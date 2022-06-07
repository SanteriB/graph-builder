import { State } from "../types";

const getTableValidationStatus = (state: State) =>
    state.isValid;

const getRowById = (state: State, id: string) =>
    state.rowData[id];

const getRowData = (state: State) =>
    state.rowData;

const getAxisData = (state: State) =>
    state.axisData;

const getLabelsAxis = (state: State) =>
    state.labelsAxis;

const getLabels = (state: State) => {
    const labelAxis = getLabelsAxis(state);

    return state.rowData.order.map(id => state.rowData[id].cells[labelAxis]);
}

const getGraphTypes = (state: State): string[] =>
    state.graphTypes;

export const selectors = {
    getTableValidationStatus,
    getRowById,
    getRowData,
    getAxisData,
    getLabelsAxis,
    getLabels,
    getGraphTypes,
};