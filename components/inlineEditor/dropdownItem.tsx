import { Component } from "inferno";

interface DropdownItemProps {
    id: string;
    title: string;
    clickOnItem: (idUpdate: string, valueUpdate: string) => void;
    disabled: boolean;
};

export class DropdownItem extends Component<DropdownItemProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                id={this.props.id}
                className={
                    this.props.disabled ?
                        "dropdown-item dropdown-item--disabled"
                        : "dropdown-item"
                }
                onMouseDown={() => this.props.clickOnItem(this.props.id, this.props.title)}
            >
                {this.props.title}
            </div>
        );
    }
}
