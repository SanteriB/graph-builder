export enum EVENTS {
    CHANGE = "change",
};

export enum KEYS {
    ENTER = "Enter",
    ESCAPE = "Escape",
};

export enum VALIDATION_STATUS {
    VALID = "valid",
    INVALID = "invalid",
};

export const DEFAULT_VALUE = "0";
export const DEFAULT_LABEL = "LABEL";
export const MAX_ROW_NUMBER = 10;
export const MAX_AXIS_NUMBER = 10;
export const MIN_ROW_NUMBER = 3;
export const MIN_AXIS_NUMBER = 3;

export enum ROW_TYPES {
    AXIS = "axis",
    ROW = "row",
};

export enum BUTTON_TYPES {
    ADD_ROW = "ADD_ROW",
    REMOVE_ROW = "REMOVE_ROW",
    ADD_AXIS = "ADD_AXIS",
    REMOVE_AXIS = "REMOVE_AXIS",
    BUILD_GRAPH = "BUILD_GRAPH",
    DOWNLOAD_GRAPH = "DOWNLOAD_GRAPH",
    UPLOAD_CSV = "UPLOAD_CSV",
};

export const GRAPH_TYPES: string[] = [
    "horizontalBarChart",
    "verticalBarChart",
    "stackedBarChart",
    "lineChart",
    "interpolationLineChart",
    "barLineCombo",
    "doughnutChart",
    "pieChart",
    "radar"
];

export const GRAPH_NAMES: { [key: string]: string } = {
    horizontalBarChart: "Horizontal Bar Chart",
    verticalBarChart: "Vertical Bar Chart",
    stackedBarChart: "Stacked Bar Chart",
    lineChart: "Line Chart",
    interpolationLineChart: "Line Chart - interpolation mode",
    barLineCombo: "Combo Bar/Line chart",
    doughnutChart: "Doughnut chart",
    pieChart: "Pie chart",
    radar: "Radar",
};

export const LINE_GRAPH_TYPE = "line";

export const GRAPH_CHARTJS_TYPES: { [key: string]: any } = {
    horizontalBarChart: "bar",
    verticalBarChart: "bar",
    stackedBarChart: "bar",
    lineChart: LINE_GRAPH_TYPE,
    interpolationLineChart: LINE_GRAPH_TYPE,
    barLineCombo: "bar",
    doughnutChart: "doughnut",
    pieChart: "pie",
    radar: "radar",
};

export const GRAPH_DATASET_OPTIONS: { [key: string]: { [key: string]: string } } = {
    horizontalBarChart: {},
    verticalBarChart: {},
    stackedBarChart: {},
    lineChart: {},
    interpolationLineChart: {
        cubicInterpolationMode: "monotone",
    },
    barLineCombo: {},
    doughnutChart: {},
    pieChart: {},
    radar: {},
};

export const GRAPH_OPTIONS: { [key: string]: { [key: string]: string } } = {
    horizontalBarChart: { indexAxis: "y" },
    verticalBarChart: {},
    stackedBarChart: {},
    lineChart: {},
    interpolationLineChart: {},
    barLineCombo: {},
    doughnutChart: {},
    pieChart: {},
    radar: {},
};

export const COLORS: string[] = [
    "rgba(141, 211, 199, 0.8)",
    "rgba(255, 255, 179, 0.8)",
    "rgba(190, 186, 218, 0.8)",
    "rgba(251, 128, 114, 0.8)",
    "rgba(128, 177, 211, 0.8)",
    "rgba(253, 180, 98, 0.8)",
    "rgba(179, 222, 105, 0.8)",
    "rgba(252, 205, 229, 0.8)",
    "rgba(217, 217, 217, 0.8)",
    "rgba(188, 128, 189, 0.8)"
];

export const LINE_COLORS: string[] = [
    "rgba(141, 211, 199, 1)",
    "rgba(255, 255, 179, 1)",
    "rgba(190, 186, 218, 1)",
    "rgba(251, 128, 114, 1)",
    "rgba(128, 177, 211, 1)",
    "rgba(253, 180, 98, 1)",
    "rgba(179, 222, 105, 1)",
    "rgba(252, 205, 229, 1)",
    "rgba(217, 217, 217, 1)",
    "rgba(188, 128, 189, 1)"
];

export const BORDER_COLOR = "rgba(31, 31, 31, 1)";
