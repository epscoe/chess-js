import * as React from 'react';
import { ChessBoard } from './ChessBoard';
import { ErrorBoundary } from './ErrorBoundary';
import './chess.css';

export class Chess extends React.Component {
    render() {
        return <ErrorBoundary><ChessBoard size={8} /></ErrorBoundary>
    }
}
