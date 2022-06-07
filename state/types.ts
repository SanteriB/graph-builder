import { initialState } from "./reducer";

export type State = ReturnType<typeof initialState>;
export type RowDataState = ReturnType<typeof initialState.rowData>;
export type AxisDataState = ReturnType<typeof initialState.axisData>;

export interface Action {
    type: string;
    payload?: any;
};