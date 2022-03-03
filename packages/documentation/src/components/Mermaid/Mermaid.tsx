import React from 'react';
import mermaid from 'mermaid';


interface Props {
    id?: string
}

export default class Mermaid extends React.PureComponent<Props> {
    private DIV: any = null;

    componentDidMount() {
        const output = this.DIV;
        if (output.firstChild !== null) {
            output.innerHTML = "";
        }

        let insert = function(code) {
            output.innerHTML = code;
        };
        mermaid.render(this.props.id ?? "preparedScheme", this.props.children, insert);
    }

    render() {
        return (<div ref={(ref) => this.DIV = ref} />);
    }
}