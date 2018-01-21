import { Position, DisallowedMove, NormalMove, CaptureMove, ChessPiece } from './PieceCommon';

export default class Rook extends ChessPiece {
    constructor(pos, color, board) {
        super('R', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return deltas.reduce((acc, delta) => acc.concat(this.repeatableMove(this, delta)), []);
    }

    repeatableMove(piece, delta) {
        let moves = [];
        let nextPos = piece.pos;
        let done = false;
        while (!done) {
            nextPos = nextPos.add(delta[0], delta[1]);
            if (!piece.board.validPos(nextPos)) break;

            let result = piece.evaluateMove(piece, nextPos);
            if (result.allowed) moves.push(result);
            done = !result.canContinue;
        }

        return moves;
    }

    evaluateMove(piece, pos) {
        var targetPiece = piece.board.pieceAt(pos);
        if (targetPiece) {
            if (targetPiece.color.colorName === piece.color.colorName) {
                return new DisallowedMove();
            }
            else {
                return new CaptureMove(false, piece.pos, pos);
            }
        }
        else {
            return new NormalMove(true, piece.pos, pos);
        }
    }
}
