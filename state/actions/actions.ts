import { actionTypes } from "./actionTypes";

/* VALIDATION */
const validateTable = (payload: boolean) => ({
    type: actionTypes.TABLE_VALIDATE,
    payload,
});

const validateRow = (payload: { id: string, isValid: boolean }) => ({
    type: actionTypes.ROW_VALIDATE,
    payload,
});

/* VALUE UPDATE */
const cleanTable = () => ({
    type: actionTypes.TABLE_CLEAN,
});

const updateTable = (payload: string[][]) => ({
    type: actionTypes.TABLE_UPDATE,
    payload,
});

const updateCellValue = (payload: { rowId: string, axis: string, value: string }) => ({
    type: actionTypes.CELL_VALUE_UPDATE,
    payload,
});

const updateAxisValue = (payload: { axis: string, value: string }) => ({
    type: actionTypes.AXIS_VALUE_UPDATE,
    payload,
});

/* ADD/REMOVE ACTIONS */
const addRow = () => ({
    type: actionTypes.ROW_ADD,
});

const removeRow = () => ({
    type: actionTypes.ROW_REMOVE,
});

const addAxis = () => ({
    type: actionTypes.AXIS_ADD,
});

const removeAxis = () => ({
    type: actionTypes.AXIS_REMOVE,
});

export const actions = {
    validateTable,
    validateRow,
    cleanTable,
    updateTable,
    updateCellValue,
    updateAxisValue,
    addRow,
    removeRow,
    addAxis,
    removeAxis,
};