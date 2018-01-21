import * as React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error, info) {
        this.setState({ error, info });
    }

    render() {
        if (this.state.error) {
            return <div><h1>{this.state.error.toString()}</h1><div>{JSON.stringify(this.state)}</div></div>;
        }
        return this.props.children;
    }
}
