import { White, Black, Position } from './PieceCommon';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import King from './King';
import Queen from './Queen';
import Pawn from './Pawn';

export default class ChessGame {
    constructor() {
        this.size = 8;
        this.pieces = this.setupInitialPieces();
        this.allowedMoves = [];
        this.moveHistory = [];
        this.whoseTurn = White;
    }

    setupInitialPieces() {
        let pieces = [
            new Rook(new Position(0, 0), White, this),
            new Knight(new Position(0, 1), White, this),
            new Bishop(new Position(0, 2), White, this),
            new King(new Position(0, 3), White, this),
            new Queen(new Position(0, 4), White, this),
            new Bishop(new Position(0, 5), White, this),
            new Knight(new Position(0, 6), White, this),
            new Rook(new Position(0, 7), White, this),
            new Rook(new Position(7, 0), Black, this),
            new Knight(new Position(7, 1), Black, this),
            new Bishop(new Position(7, 2), Black, this),
            new King(new Position(7, 3), Black, this),
            new Queen(new Position(7, 4), Black, this),
            new Bishop(new Position(7, 5), Black, this),
            new Knight(new Position(7, 6), Black, this),
            new Rook(new Position(7, 7), Black, this),
        ];

        for (let col = 0; col < this.size; col++) {
            pieces.push(new Pawn(new Position(1, col), White, this));
            pieces.push(new Pawn(new Position(6, col), Black, this));
        }

        return pieces;
    }

    pieceAt(pos) {
        return this.pieces.find(piece => piece.pos.equivalent(pos));
    }

    allowedMoveAt(pos) {
        return this.allowedMoves.find(m => m.targetPos.equivalent(pos));
    }

    validPos(pos) {
        return pos.row >= 0 && pos.col >= 0 && pos.row < this.size && pos.col < this.size;
    }

    selectedPiece() {
        return this.pieces.find((piece) => piece.selected);
    }

    deselectPiece(selectedPiece) {
        if (selectedPiece) {
            selectedPiece.selected = false;
            this.allowedMoves = [];
        }
    }

    selectPiece(piece) {
        if (piece) {
            piece.selected = true;
            this.allowedMoves = piece.availableMoves();
        }
    }

    clickSquare(pos) {
        var piece = this.pieceAt(pos);
        var move = this.allowedMoveAt(pos);
        var previouslySelected = this.selectedPiece();

        console.log(`clicked square ${pos.notation()} -- ${piece ? piece.constructor.name : 'empty'}`);

        this.deselectPiece(previouslySelected);

        if (move) this.executeMove(move);
        else if (piece && piece !== previouslySelected && piece.color === this.whoseTurn) this.selectPiece(piece);
    }

    executeMove(move) {
        console.log(move.notation());
        move.execute(this);
        this.moveHistory.push(move);
        this.whoseTurn = this.whoseTurn === White ? Black : White;
    }

    movePiece(piece, targetPos) {
        piece.x = targetPos.x;
        piece.y = targetPos.y;
    }

    removePiece(capturedPiece) {
        var index = this.pieces.indexOf(capturedPiece);
        if (index >= 0) {
            this.pieces.splice(index, 1);
        }
        else {
            throw 'captured piece not found!';
        }
    }
}