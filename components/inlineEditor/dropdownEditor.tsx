import { Component, createRef } from "inferno";
// import { store } from "../../state/store";
// import { actions } from "../../state/actions/actions";
import { EVENTS, GRAPH_NAMES, KEYS } from "../../utils/constants";
import { DropdownItem } from "./dropdownItem";

interface DropdownEditorProps {
    graphTypes: string[];
    value: string;
    id: string;
    action: (value: string) => void;
};

interface DropdownEditorStateProps {
    id: string;
    value: string;
    graphTypes: string[];
    showList: boolean;
};

export class DropdownEditor extends Component<DropdownEditorProps, DropdownEditorStateProps> {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            value: this.props.value,
            graphTypes: this.props.graphTypes,
            showList: false,
        }

        this.refs = createRef();

        this.changeValue = this.changeValue.bind(this);
        this.clickOnItem = this.clickOnItem.bind(this);
        this.focusIn = this.focusIn.bind(this);
        this.focusOut = this.focusOut.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    changeValue(event) {
        this.setState({
            value: event.target.value,
            graphTypes: this.props.graphTypes.filter(type =>
                GRAPH_NAMES[type].toLowerCase().includes(event.target.value.toLowerCase())
            ),
        });

        if (event.type === EVENTS.CHANGE) {
            const idUpdate = this.props.graphTypes.find(type => 
                GRAPH_NAMES[type].toLowerCase() === event.target.value.toLowerCase());
            if (idUpdate) {
                this.setState({
                    id: idUpdate,
                    graphTypes: this.props.graphTypes,
                });
                this.props.action(idUpdate);
            } else {
                this.setState({
                    id: this.props.id,
                    value: this.props.value,
                    graphTypes: this.props.graphTypes,
                });
                this.props.action(this.props.id);
            }
        }
    }

    clickOnItem(id, value) {
        this.setState({
            id,
            value,
            graphTypes: this.props.graphTypes,
        });
        this.props.action(id);
    }

    focusIn() {
        this.setState({
            showList: true,
        });

        this.refs.current.select();
    }

    focusOut() {
        this.setState({
            showList: false,
        });
    }

    keyDown(event) {
        switch (event.key) {
            case KEYS.ENTER:
                this.refs.current.blur();
                break;
            case KEYS.ESCAPE:
                this.refs.current.blur();
                break;
        }
    }

    render() {
        return (
            <div className="dropdown-container">
                <input
                    ref={this.refs}
                    id={this.state.id}
                    className={"dropdown"}
                    type="text"
                    autoComplete="new-password"
                    value={this.state.value}
                    onInput={this.changeValue}
                    onChange={this.changeValue}
                    onFocus={this.focusIn}
                    onBlur={this.focusOut}
                    onKeyDown={this.keyDown}
                />
                {
                    this.state.showList ?
                        this.state.graphTypes.length ?
                            <div className="dropdown-content">
                                {this.state.graphTypes.map(type => (
                                    <DropdownItem
                                        id={type}
                                        title={GRAPH_NAMES[type]}
                                        clickOnItem={this.clickOnItem}
                                        disabled={false}
                                    />
                                ))}
                            </div> : <div className="dropdown-content">
                                <DropdownItem
                                    id={undefined}
                                    title={"No graphs available"}
                                    clickOnItem={() => {}}
                                    disabled={true}
                                />
                            </div>
                        : null
                }
            </div>
        );
    }
}
