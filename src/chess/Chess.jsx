import * as React from 'react';
import ChessBoard from './views/ChessBoard';
import MoveList from './views/MoveList';
import ErrorBoundary from './ErrorBoundary';
import ChessGame from './models/ChessGame';
import './chess.css';

export class Chess extends React.Component {
    constructor(props) {
        super(props);
        this.clickSquare = this.clickSquare.bind(this);

        this.game = this.props.game || new ChessGame();
    }

    render() {
        return <ErrorBoundary>
            <ChessBoard game={this.game} clickSquare={this.clickSquare} />
            <MoveList moveHistory={this.game.moveHistory}/>
        </ErrorBoundary>
    }

    clickSquare(pos) {
        this.game.clickSquare(pos);
        this.forceUpdate();
    }
}
