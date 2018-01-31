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
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
    }

    render() {
        return <ErrorBoundary>
            <div>
                {this.renderCheckCondition()}
            </div>
            <div className="vertical-section">
                <ChessBoard game={this.game} clickSquare={this.clickSquare} />
                <div>
                    <button>New game</button>
                    <button onClick={this.undo}>Undo</button>
                    <button onClick={this.redo}>Redo</button>
                </div>
            </div>
            <div className="vertical-section">
                <MoveList moveHistory={this.game.moveHistory} />
            </div>
        </ErrorBoundary>
    }

    renderCheckCondition() {
        if (this.game.isCheckmate())
            return <h2>{this.game.otherColor(this.game.whoseTurn).colorName} wins!</h2>;
        else if (this.game.isCurrentPlayerInCheck())
            return <h2>{this.game.whoseTurn.colorName} is in Check!</h2>
        else
            return <br />;
    }

    clickSquare(pos) {
        this.game.clickSquare(pos);
        this.forceUpdate();
    }

    undo() {
        this.game.undoLastMove();
        this.forceUpdate();
    }

    redo() {
        this.game.redoLastMove();
        this.forceUpdate();
    }
}
