import { MathNode, MathNodeType } from "@math-x-ts/core";


const getMermaidForType = (jsonNode, nodeName: string) => {
    if(jsonNode.type === MathNodeType.Constant) {
        return `leaf${nodeName}["${jsonNode.value}"]`;
    }

    if(jsonNode.type === MathNodeType.Add) {
        return `node${nodeName}["Add"]`;
    }
    if(jsonNode.type === MathNodeType.Subtract) {
        return `node${nodeName}["Subtract"]`;
    }
    if(jsonNode.type === MathNodeType.Multiply) {
        return `node${nodeName}["Multiply"]`;
    }
    if(jsonNode.type === MathNodeType.Divide) {
        return `node${nodeName}["Divide"]`;
    }
    if(jsonNode.type === MathNodeType.Fraction) {
        return `node${nodeName}["Fraction"]`;
    }
    if(jsonNode.type === MathNodeType.Exponent) {
        return `node${nodeName}["Exponent"]`;
    }
    if(jsonNode.type === MathNodeType.Parenthesis) {
        return `node${nodeName}["Parenthesis"]`;
    }
    if(jsonNode.type === MathNodeType.Negative) {
        return `node${nodeName}["Negative"]`;
    }
};

const buildMermaidJs = (jsonNode: any, nodeName = "node") => {


    if(jsonNode.type === MathNodeType.Constant) {
        return `leaf${nodeName}["${jsonNode.value}"];`;
    }

    if([MathNodeType.Add, MathNodeType.Subtract, MathNodeType.Multiply, MathNodeType.Divide].includes(jsonNode.type)) {
        let node = `
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.left, `${nodeName}-l`)};
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.right, `${nodeName}-r`)};
           `;

        if (jsonNode.left.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.left, `${nodeName}-l`)}   
            `;
        }

        if (jsonNode.right.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.right, `${nodeName}-r`)}   
            `;
        }

        return node;
    }

    if(jsonNode.type === MathNodeType.Fraction) {
        let node = `
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.numerator, `${nodeName}-n`)};
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.denominator, `${nodeName}-d`)};
           `;

        if (jsonNode.numerator.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.numerator, `${nodeName}-n`)}   
            `;
        }

        if (jsonNode.denominator.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.denominator, `${nodeName}-d`)}   
            `;
        }

        return node;
    }

    if(jsonNode.type === MathNodeType.Exponent) {
        let node = `
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.base, `${nodeName}-b`)};
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.exponent, `${nodeName}-e`)};
           `;

        if (jsonNode.base.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.base, `${nodeName}-b`)}   
            `;
        }

        if (jsonNode.exponent.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.exponent, `${nodeName}-e`)}   
            `;
        }

        return node;
    }

    if([MathNodeType.Parenthesis, MathNodeType.Negative].includes(jsonNode.type)) {
        let node = `
           ${getMermaidForType(jsonNode, nodeName)} --> ${getMermaidForType(jsonNode.content, `${nodeName}-c`)};
           `;

        if (jsonNode.content.type !== MathNodeType.Constant) {
            node = `${node}
               ${buildMermaidJs(jsonNode.content, `${nodeName}-c`)}   
            `;
        }

        return node;
    }
};

export const mathNodeToMermaid = (mathNode: MathNode) => {
    return `
            graph TD;
            ${buildMermaidJs(mathNode.toJson(), "node")}
           `;
    

};