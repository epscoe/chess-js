import { White, Black, Position, CaptureMove } from './PieceCommon';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import King from './King';
import Queen from './Queen';
import Pawn from './Pawn';
import MoveHistory from './MoveHistory';

export default class ChessGame {
    constructor() {
        this.size = 8;
        this.pieces = this.setupInitialPieces();
        this.allowedMovesForSelectedPiece = [];
        this.allMoves = [];
        this.moveHistory = new MoveHistory();
        this.setTurn(White);
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
        const piece = this.selectedPiece();
        return this.allMoves.find(m => m.piece === piece && m.targetPos.equivalent(pos));
    }

    validPos(pos) {
        return pos.row >= 0 && pos.col >= 0 && pos.row < this.size && pos.col < this.size;
    }

    selectedPiece() {
        return this.pieces.find(piece => piece.selected);
    }

    deselectPiece(selectedPiece) {
        if (selectedPiece) {
            selectedPiece.selected = false;
            this.allowedMovesForSelectedPiece = [];
        }
    }

    selectPiece(piece) {
        if (piece) {
            piece.selected = true;
            this.allowedMovesForSelectedPiece = this.allMoves.filter(m => m.piece === piece);
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
        this.setTurn(this.otherColor(this.whoseTurn));
    }

    setTurn(color) {
        this.whoseTurn = color;
        this.allMoves = this.pieces
            .filter(p => p.color === color)
            .map(p => this.removeSelfCheckMoves(p.availableMoves()))
            .reduce((acc, curr) => acc.concat(curr), []);
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

    addPiece(formerlyCapturedPiece) {
        this.pieces.push(formerlyCapturedPiece);
    }

    otherColor(color) {
        return color === White ? Black : White;
    }

    isCurrentPlayerInCheck() {
        return this.isInCheck(this.whoseTurn);
    }

    isInCheck(defendingColor) {
        let attackingColor = this.otherColor(defendingColor);
        return this.pieces
            .filter(p => p.color === attackingColor)
            .map(p => p.availableMoves())
            .some(this.includesKingAttack);
    }

    isCheckmate() {
        return this.isCurrentPlayerInCheck() && this.allMoves.length === 0;
    }

    includesKingAttack(moveList) {
        return moveList.some(move => move instanceof CaptureMove && move.targetPiece instanceof King);
    }

    removeSelfCheckMoves(moveList) {
        return moveList.filter(move => {
            move.execute(this);
            let invalid = this.isInCheck(move.color);
            move.undo(this);

            return !invalid;
        })
    }
}