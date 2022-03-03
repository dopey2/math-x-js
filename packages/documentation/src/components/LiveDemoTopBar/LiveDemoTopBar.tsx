import React from 'react';
import './live-demo-topbar.css';


interface Props {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  onClickNext: () => void;
  onClickSolveAll: () => void;
}

export default class LiveDemoTopBar extends React.PureComponent<Props> {

    onInputChange = (ev) => {
        this.props.onChange(ev.target.value);
    };

    onSelectChange = (value) => {
        this.props.onChange(value);
    };


    render() {
        return (
            <nav className="navbar">
                <div className="navbar__inner">
                    <div className="navbar__items">
                        <input
                            id="live-demo-input"
                            className="select__input" placeholder="Expression"
                            value={this.props.value}
                            onChange={this.onInputChange}
                        />
                                

                        <div className="dropdown dropdown--hoverable ml-10">
                            <button
                                id="live-demo-sample"
                                className="button button--outline button--primary"
                            >Samples</button>
                            <ul className="dropdown__menu">
                                {this.props.items.map((expression, i) => (
                                    <li key={i}>
                                        <a className="dropdown__link" onClick={() => this.onSelectChange(expression)}>{expression}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="navbar__items navbar__items--right">
                        <button
                            id="live-demo-next"
                            className="button button--secondary"
                            onClick={this.props.onClickNext}
                        >.next()</button>
                        <button
                            id="live-demo-solve-all"
                            className="button button--primary ml-10"
                            onClick={this.props.onClickSolveAll}
                        >.solveAll()</button>
                    </div>
                </div>
            </nav>
        );
    }
}