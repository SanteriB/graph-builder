import { Component, createRef } from "inferno";
import { store } from "../../state/store";
import { actions } from "../../state/actions/actions";
import { EVENTS, KEYS, ROW_TYPES } from "../../utils/constants";
import { isValueValid } from "../../utils/validationUtil";
import { serializer } from "../../utils/serializer";

interface InlineEditorProps {
    axis: string;
    rowId: string;
    value: string;
    disableValidation: boolean;
};

interface InlineEditorStateProps {
    value: string;
    prevValue: string;
    isValueValid: boolean;
};

export class InlineEditor extends Component<InlineEditorProps, InlineEditorStateProps> {
    private escapeClicked: boolean;

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            prevValue: this.props.value,
            isValueValid: this.props.disableValidation || isValueValid(this.props.value),
        }

        this.refs = createRef();

        this.focus = this.focus.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.keyDown = this.keyDown.bind(this);

        this.escapeClicked = false;
    }

    focus() {
        this.refs.current.select();
    }

    changeValue(event) {
        this.setState({
            value: event.target.value,
            isValueValid: this.props.disableValidation || isValueValid(event.target.value),
        });

        if (event.type === EVENTS.CHANGE) {
            if (this.escapeClicked) {
                this.setState({
                    value: this.state.prevValue,
                    isValueValid: this.props.disableValidation || isValueValid(this.state.prevValue),
                });

                this.escapeClicked = false;
                return;
            }

            const valueUpdate = this.state.isValueValid && !this.props.disableValidation ?
                serializer.serialize(event.target.value) : event.target.value;

            this.setState({
                value: valueUpdate,
                prevValue: valueUpdate
            });

            switch (this.props.rowId) {
                case ROW_TYPES.AXIS:
                    store.dispatch(actions.updateAxisValue({
                        axis: this.props.axis,
                        value: this.state.value,
                    }));
                    break;
                default:
                    store.dispatch(actions.updateCellValue({
                        rowId: this.props.rowId,
                        axis: this.props.axis,
                        value: this.state.value,
                    }));
                    break;
            }
        }
    }

    keyDown(event) {
        switch (event.key) {
            case KEYS.ENTER:
                this.refs.current.blur();
                break;
            case KEYS.ESCAPE:
                this.escapeClicked = true;
                this.refs.current.blur();
                break;
        }
    }

    render() {
        return (
            <label className={this.state.isValueValid ? undefined : "invalid"}>
                <input
                    ref={this.refs}
                    className={this.state.isValueValid ? "valid" : "invalid"}
                    type="text"
                    autoComplete="new-password"
                    value={this.state.value}
                    onFocus={this.focus}
                    onInput={this.changeValue}
                    onChange={this.changeValue}
                    onKeyDown={this.keyDown}
                />
            </label>
        );
    }
}
