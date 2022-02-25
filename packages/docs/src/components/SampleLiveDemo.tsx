import React from 'react';
import { parse } from '@math-x-ts/parser'
import Select from './Select/Select'
import ExpressionSolver from './ExpressionSolver/ExpressionSolver'

const expressionList = [
  '1 + 2',
  '1 + 2 * 3',
  '(1 + 2) * 3',
  '1 + 2 - (-3)',
  '{5 + 5} / {7 - 2}',
]

export default class SampleLiveDemo extends React.PureComponent {

  state = {
    expression: expressionList[0],
  }

  onExpressionChange = (expression) => {
      this.setState({ expression })
  }

  getMathNodeFromExpression = () => {
    let mathNode = null;

    try {
      mathNode = parse(this.state.expression);
    } catch (err) {}

    return mathNode;
  }

  render() {

    const mathNode = this.getMathNodeFromExpression();

    return (
        <div>
          <Select
              items={expressionList}
              value={this.state.expression}
              onChange={this.onExpressionChange}
          />

          Katex renderer

          {mathNode ? (
              <ExpressionSolver
                  key={this.state.expression}
                  expression={mathNode}
              />
          ) : (
              <div style={{marginTop: 20, color: 'red'}}>Error</div>
          )}
        </div>

    )
  }
}