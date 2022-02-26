import LiveDemoTopBar from './LiveDemoTopBar/LiveDemoTopBar';
import ExpressionSolver from './ExpressionSolver/ExpressionSolver';
import React from 'react';
import { parse } from '@math-x-ts/parser';


const expressionList = [
    '1 + 2',
    '1 + 2 * 3',
    '-5 + 10',
    '(1 + 2) * 3',
    '1 + 2 - (-3)',
    '5 + ( 2 * ( 1 + 3))',
    '6 / 3',
    '6 / 3 + 4',
    '7 / 3 + 4',
    '8 / 3 * 4',
    '8 / {3 * 4}',
    '5 / 3 + 3 / 4',
    '7 / 2 * 3 / 8',
    '5 / 2 : 3 / 8',
    '{5 + 5} / {7 - 2}',
    '3^2',
    '3^2 + 2',
    '3^{2 + 2}',
    '{ (20 + 16) - 2^{6 - 4}} / { (7 - 8) * (-2)} + 3'
];

export default class SampleLiveDemo extends React.PureComponent {

    state = {
        expression: expressionList[0],
    };

    EXPRESSION_SOLVER: ExpressionSolver | null = null;

    onExpressionChange = (expression) => {
        this.setState({ expression });
    };

    getMathNodeFromExpression = () => {
        let mathNode = null;

        try {
            mathNode = parse(this.state.expression);
        } catch (err) {}

        return mathNode;
    };
    
    onClickNext = () => {
        this.EXPRESSION_SOLVER && this.EXPRESSION_SOLVER.solveNext();
    };
    
    onClickSolveAll = () => {
        this.EXPRESSION_SOLVER && this.EXPRESSION_SOLVER.solveAll();
    };

    render() {

        const mathNode = this.getMathNodeFromExpression();

        return (
            <div>
                <LiveDemoTopBar
                    items={expressionList}
                    value={this.state.expression}
                    onChange={this.onExpressionChange}
                    onClickNext={this.onClickNext}
                    onClickSolveAll={this.onClickSolveAll}
                />

                {mathNode ? (
                    <ExpressionSolver
                        ref={(ref) => this.EXPRESSION_SOLVER = ref }
                        key={this.state.expression}
                        expression={mathNode}
                    />
                ) : (
                    <div style={{ marginTop: 20, color: 'red' }}>Error</div>
                )}
            </div>

        );
    }
}