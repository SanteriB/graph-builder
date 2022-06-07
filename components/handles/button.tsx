import { Component } from "inferno";
import { connect } from "inferno-redux";
import {
    BUTTON_TYPES,
    MAX_AXIS_NUMBER,
    MAX_ROW_NUMBER,
    MIN_AXIS_NUMBER,
    MIN_ROW_NUMBER
} from "../../utils/constants";
import { selectors } from "../../state/selectors/selectors";

interface ButtonProps {
    disabled: boolean;
    type: string;
    name: string;
    action: () => void;
};

class ButtonComponent extends Component<ButtonProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className={
                    this.props.type === BUTTON_TYPES.BUILD_GRAPH ?
                        "button button--build" : "button"
                }
                disabled={this.props.disabled}
                onClick={this.props.action}
            >
                {this.props.name}
            </button>
        );
    }
}

const mapStateToProps = (state, props: ButtonProps) => {
    let disabled = false;
    switch (props.type) {
        case BUTTON_TYPES.ADD_ROW:
            disabled = selectors.getRowData(state).order.length >= MAX_ROW_NUMBER;
            break;
        case BUTTON_TYPES.REMOVE_ROW:
            disabled = selectors.getRowData(state).order.length < MIN_ROW_NUMBER;
            break;
        case BUTTON_TYPES.ADD_AXIS:
            disabled = selectors.getAxisData(state).order.length >= MAX_AXIS_NUMBER;
            break;
        case BUTTON_TYPES.REMOVE_AXIS:
            disabled = selectors.getAxisData(state).order.length < MIN_AXIS_NUMBER;
            break;
        case BUTTON_TYPES.BUILD_GRAPH:
            disabled = !selectors.getTableValidationStatus(state);
            break;
    }

    return {
        disabled,
    }
};

export const Button = connect(mapStateToProps)(ButtonComponent);
