import React from 'react';
import Katex from '../Katex/Katex';
import { MathNode } from '@math-x-ts/core';
import { parse } from '@math-x-ts/parser';
import './expression-solver.css';

interface Props {
  expression: MathNode;
}

interface State {
  lastStep: MathNode;
  steps: MathNode[];
}

export default class ExpressionSolver extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      lastStep: props.expression,
      steps: [props.expression],
    };
  }

  componentDidUpdate(prevProps: Props) {
    if(prevProps.expression !== this.props.expression) {
      this.setState({
        lastStep: this.props.expression,
        steps: [this.props.expression],
      });
    }
  }

  solveNext = () => {
    const lastStep = this.state.lastStep.next();

    if (this.state.lastStep.isAtomic) {
      return;
    }

    this.setState((prevState: State) => {
      return {
        steps: [...prevState.steps, lastStep],
        lastStep,
      };
    });
  };

  solveAll = () => {
    const steps = this.props.expression.solveAll();
    this.setState({ steps, lastStep: steps[steps.length -1] });
  };

  render() {
    return (
        <div className="expression-solver">
          
          <div className="expression-solver__steps-container">
            {this.state.steps.map((node: MathNode, i: number) => {
              return <Katex tex={node.toTex()} key={i}/>;
            })}  
          </div>
          

          <div className="expression-solver__button-container">
            <button className="expression-solver__button-next" onClick={this.solveNext}>.next()</button>
            <button className="expression-solver__button-solve-all" onClick={this.solveAll}>.solveAll()</button>
          </div>

        </div>
    );
  }
}