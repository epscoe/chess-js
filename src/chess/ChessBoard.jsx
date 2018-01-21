import * as React from 'react';
import { EmptySquare, OccupiedSquare } from './Squares';
import { White, Black, Position, CaptureMove } from './PieceCommon';
import Rook from './Rook';
import Knight from './Knight';

export class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.clickPiece = this.clickPiece.bind(this);
        this.clickSquare = this.clickSquare.bind(this);

        let pieces = [
            new Rook(new Position(0, 0), White, this),
            new Knight(new Position(0, 1), White, this),
            new Knight(new Position(0, 6), White, this),
            new Rook(new Position(0, 7), White, this),
            new Rook(new Position(7, 0), Black, this),
            new Knight(new Position(7, 1), Black, this),
            new Knight(new Position(7, 6), Black, this),
            new Rook(new Position(7, 7), Black, this),
        ];

        this.state = { pieces, allowedMoves: [], moveHistory: [] };
    }

    render() {
        this.state.pieces.forEach(piece => piece.resetClass());
        var rows = [];
        for (var row = 0; row < this.props.size; row++) {
            var cells = [];
            for (var col = 0; col < this.props.size; col++) {
                let pos = new Position(row, col);
                var content = this.cellContent(pos);
                cells.push(<td key={row * this.props.size + col}>{content}</td>);
            }

            rows.push(<tr key={row}>{cells}</tr>);
        }

        return <table><tbody>{rows}</tbody></table>;
    }

    pieceAt(pos) {
        return this.state.pieces.find(piece => piece.pos.equivalent(pos));
    }

    allowedMoveAt(pos) {
        return this.state.allowedMoves.find(m => m.targetPos.equivalent(pos));
    }

    validPos(pos) {
        return pos.row >= 0 && pos.col >= 0 && pos.row < this.props.size && pos.col < this.props.size;
    }

    cellContent(pos) {
        var piece = this.pieceAt(pos);
        if (piece) {
            var targetingMove = this.allowedMoveAt(pos);
            if (targetingMove && targetingMove instanceof CaptureMove) piece.setClass('attack-target');

            let selectionClass = piece.selected ? 'selected' : 'unselected';
            piece.setClass(selectionClass);
            return <OccupiedSquare classes={piece.classes} piece={piece} display={piece.identifier} handleClick={() => this.clickPiece(piece)} />;
        }
        else {
            let cls = this.allowedMoveAt(pos) ? 'empty-target' : 'unselected';
            return <EmptySquare className={cls} handleClick={() => this.clickSquare(pos)} />;
        }
    }

    // not sure if clickPiece and clickSquare should even be two different entrypoints
    clickPiece(piece) {
        console.log(`clicked ${piece.constructor.name} (${piece.pos.row}, ${piece.pos.col})`);

        var previouslySelected = this.selectedPiece();
        var move = this.allowedMoveAt(piece.pos);

        if (move) {
            move.execute(this);
            this.deselectPiece(previouslySelected);
        }
        else if (piece !== previouslySelected) {
            this.deselectPiece(previouslySelected);
            this.selectPiece(piece);
        }

        this.forceUpdate();
    }

    deselectPiece(selectedPiece) {
        if (selectedPiece) {
            selectedPiece.selected = false;
            this.setState({ allowedMoves: [] });
        }
    }

    selectPiece(piece) {
        if (piece) {
            piece.selected = true;
            this.setState({ allowedMoves: piece.availableMoves() });
        }
    }

    clickSquare(pos) {
        console.log(`clicked square (${pos.row}, ${pos.col})`);

        var move = this.allowedMoveAt(pos);
        if (move) move.execute(this);

        var piece = this.selectedPiece();
        if (piece) piece.selected = false;
        this.setState({ allowedMoves: [] });
    }

    selectedPiece() {
        return this.state.pieces.find((piece) => piece.selected);
    }

    movePiece(piece, targetPos) {
        piece.x = targetPos.x;
        piece.y = targetPos.y;
    }

    removePiece(capturedPiece) {
        var index = this.state.pieces.indexOf(capturedPiece);
        if (index >= 0) {
            this.state.pieces.splice(index, 1);
        }
        else {
            throw 'captured piece not found!';
        }
    }
}
