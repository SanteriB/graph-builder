export const validateRow = (row, labelsAxis: string) =>
    Object.keys(row.cells).filter(id =>
        id !== labelsAxis).every(id =>
            !isNaN(Number(row.cells[id])));

export const isValueValid = (value) => !isNaN(Number(value));