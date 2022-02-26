/* eslint-disable */

import React from 'react';
import clsx from "clsx";
import CodeBlock from '@theme/CodeBlock';
import { MathNode } from '@math-x-ts/core';
import Katex from '../Katex/Katex';
import './expression-solver.css';


interface Props {
 expression: MathNode;
}

interface State {
 lastStep: MathNode;
 steps: MathNode[];
 selectedOutput: number;
}

const TabItem = (props: {value: number, selected: number, label: string, onChange: (value: any) => void}) => {
   return (
       <li
           onClick={() => props.onChange(props.value)}
           className={clsx({
               'pills__item': true,
               'pills__item--active': props.value === props.selected,
           })}
       >{props.label}</li>
   );
};

export default class ExpressionSolver extends React.PureComponent<Props, State> {
   constructor(props: Props) {
       super(props);

       this.state = {
           lastStep: props.expression,
           steps: [props.expression],
           selectedOutput: 0,
       };

       this.onTabChange = this.onTabChange.bind(this);
       this.solveAll = this.solveAll.bind(this);
       this.solveNext = this.solveNext.bind(this);
   }

    componentDidUpdate(prevProps: Props) {
        if(prevProps.expression !== this.props.expression) {
            this.setState({
                lastStep: this.props.expression,
                steps: [this.props.expression],
            });
        }
    }

   solveNext() {
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

   solveAll() {
       const steps = this.props.expression.solveAll();
       this.setState({ steps, lastStep: steps[steps.length - 1] });
   };

   onTabChange(tab: number) {
       this.setState({ selectedOutput: tab });
   };

   getOutputForNode(mathNode: MathNode, i: number) {
       if(this.state.selectedOutput === 0) {
           return <Katex tex={mathNode.toTex()} key={i}/>;
       } else if(this.state.selectedOutput === 1) {
           return <div key={i}>{mathNode.toString()}</div>
       } else if(this.state.selectedOutput === 2) {
           return <div key={i}>{mathNode.toTex()}</div>
       } else if(this.state.selectedOutput === 3) {
           return (
               <CodeBlock
                   key={i}
                   className="language-jsx">{JSON.stringify(mathNode.toJson(), null, '\t')}
               </CodeBlock>
           )
       }
   }

   render() {
       return (
           <div className="expression-solver">

               <div className="pills mt-20">
                   <TabItem
                       value={0}
                       selected={this.state.selectedOutput}
                       onChange={this.onTabChange}
                       label="Katex renderer"
                   />
                   <TabItem
                       value={1}
                       selected={this.state.selectedOutput}
                       onChange={this.onTabChange}
                       label="toString()"
                   />
                   <TabItem
                       value={2}
                       selected={this.state.selectedOutput}
                       onChange={this.onTabChange}
                       label="toTex()"
                   />
                   <TabItem
                       value={3}
                       selected={this.state.selectedOutput}
                       onChange={this.onTabChange}
                       label="toJson()"
                   />
               </div>

               <div className="expression-solver__steps-container">
                   {this.state.steps.map((node: MathNode, i: number) => this.getOutputForNode(node, i))}
               </div>
           </div>
       );
   }
}