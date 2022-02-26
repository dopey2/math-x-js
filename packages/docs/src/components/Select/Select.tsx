import Katex from '../Katex/Katex';
import React from 'react';
import clsx from 'clsx';
import './select.css';


interface Props {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

interface State {
  showOptions: boolean;
}

export default class Select extends React.PureComponent<Props, State> {

    state = {
        showOptions: false,
    };

    /**
   * Alert if clicked on outside of element
   */
    handleClickOutside = (event) => {

        if(["select__chevron-container", "select__chevron"].includes(event.target.className)) {
            return;
        }

        if(this.state.showOptions) {
            if(event.target.id !== "select-options-container" && event.target.className !== "select_option-item") {
                this.setState({ showOptions: false });
            }
        }
    };
    onInputChange = (ev) => {
        this.props.onChange(ev.target.value);
    };
    onSelectChange = (value) => {
        this.props.onChange(value);
        this.setState({
            showOptions: false,
        });
    };
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    render() {
        return (
            <div className="select__container">

                <nav className="navbar">
                    <div className="navbar__inner">
                        <div className="navbar__items">
                            <a className="navbar__brand">Infima</a>
                        </div>
                    </div>
                </nav>


                <div className="select__inner-container">
                    <input className="select__input"
                        type="text"
                        value={this.props.value}
                        onChange={this.onInputChange}
                    />

                    <div
                        className="select__chevron-container"
                        onClick={() => this.setState((prevState) => ({ showOptions: !prevState.showOptions }))}
                    >
                        <span className={clsx({
                            select__chevron: true,
                            down: !this.state.showOptions,
                        })} />
                    </div>
                </div>


                {this.state.showOptions && (
                    <div
                        id="select-options-container"
                        className="select__options-container"
                    >
                        {this.props.items.map((expression, i) => (
                            <span
                                key={i}
                                onClick={() => this.onSelectChange(expression)}
                                className="select_option-item"
                            >{expression}</span>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}