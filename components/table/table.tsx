import { Component } from "inferno";
import { TableHeader } from "./tableHeader";
import { TableBody } from "./tableBody";

export class Table extends Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <TableHeader axisData={{}} labelsAxis={""} />
                <TableBody rowData={{}} labelsAxis={""} />
            </table>
        );
    }
}
