/* eslint-disable */

import React from 'react';
import clsx from "clsx";
import CodeBlock from '@theme/CodeBlock';
import { MathNode } from '@math-x-ts/core';
import Katex from '../Katex/Katex';
import './expression-solver.css';
import Mermaid from "../Mermaid/Mermaid";
import { mathNodeToMermaid } from "../../tools/tools";


interface Props {
 expression: MathNode;
 selectedOutput: number;
 onSelectedOutputChange: (v: number) => void
}

interface State {
 lastStep: MathNode;
 steps: MathNode[];
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
       };

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

   getOutputForNode(mathNode: MathNode, i: number) {
       if(this.props.selectedOutput === 0) {
           return <Katex tex={mathNode.toTex()} key={i}/>;
       } else if(this.props.selectedOutput === 1) {
           const mermaidCode = mathNodeToMermaid(mathNode)

           return (
               <Mermaid key={i} id={`scheme-${i}`}>{mermaidCode}</Mermaid>
           )
       } else if(this.props.selectedOutput === 2) {
           return <div key={i}>{mathNode.toString()}</div>
       } else if(this.props.selectedOutput === 3) {
           return <div key={i}>{mathNode.toTex()}</div>
       } else if(this.props.selectedOutput === 4) {
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
               <div
                   id="live-demo-output-type"
                   className="pills mt-20"
               >
                   <TabItem
                       value={0}
                       selected={this.props.selectedOutput}
                       onChange={this.props.onSelectedOutputChange}
                       label="Katex renderer"
                   />

                   <TabItem
                       value={1}
                       selected={this.props.selectedOutput}
                       onChange={this.props.onSelectedOutputChange}
                       label="Tree"
                   />

                   <TabItem
                       value={2}
                       selected={this.props.selectedOutput}
                       onChange={this.props.onSelectedOutputChange}
                       label="toString()"
                   />
                   <TabItem
                       value={3}
                       selected={this.props.selectedOutput}
                       onChange={this.props.onSelectedOutputChange}
                       label="toTex()"
                   />
                   <TabItem
                       value={4}
                       selected={this.props.selectedOutput}
                       onChange={this.props.onSelectedOutputChange}
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