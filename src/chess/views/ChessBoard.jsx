import * as React from 'react';
import { EmptySquare, OccupiedSquare } from './Squares';
import { Position, CaptureMove } from '../models/PieceCommon';
import ChessGame from '../models/ChessGame';

export class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.clickSquare = this.clickSquare.bind(this);

        this.game = new ChessGame();
    }

    pieces() {
        return this.game.pieces;
    }

    pieceAt(pos) {
        return this.game.pieceAt(pos);
    }

    render() {
        this.pieces().forEach(piece => piece.resetClass());

        const size = this.game.size;

        let rows = [];
        for (let row = 0; row < size; row++) {
            let cells = Array(size).fill()
                .map((_, col) => new Position(row, col))
                .map(this.cellContent, this)
                .map((content, idx) => <td key={row * size + idx}>{content}</td>);

            rows.push(<tr key={row}><th>{row + 1}</th>{cells}<th>{row + 1}</th></tr>);
        }

        let columnHeaders = Array(size).fill()
            .map((_, col) => String.fromCharCode(97 + col))
            .map(char => <td key={char}>{char}</td>)

        return <table>
            <thead><tr><th />{columnHeaders}</tr></thead>
            <tbody>{rows}</tbody>
            <thead><tr><th />{columnHeaders}</tr></thead>
        </table>;
    }

    cellContent(pos) {
        var game = this.game;
        var piece = game.pieceAt(pos);
        var targetingMove = game.allowedMoveAt(pos);

        if (piece) {
            if (targetingMove && targetingMove instanceof CaptureMove) piece.setClass('attack-target');

            let selectionClass = piece.selected ? 'selected' : 'unselected';
            piece.setClass(selectionClass);
            return <OccupiedSquare classes={piece.classes} piece={piece} display={piece.identifier} handleClick={() => this.clickSquare(pos)} />;
        }
        else {
            let cls = targetingMove ? 'empty-target' : 'unselected';
            return <EmptySquare className={cls} handleClick={() => this.clickSquare(pos)} />;
        }
    }

    clickSquare(pos) {
        this.game.clickSquare(pos);
        this.forceUpdate();
    }
}
