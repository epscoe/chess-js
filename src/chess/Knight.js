import { Position, DisallowedMove, NormalMove, CaptureMove, ChessPiece } from './PieceCommon';

export default class Knight extends ChessPiece {
    constructor(pos, color, board) {
        super('N', pos, color, board);

        let moveDeltas = [];

        const seedA = [-1, 1];
        const seedB = [-2, 2];

        seedA.forEach(a => seedB.forEach(b => {
            moveDeltas.push([a, b]);
            moveDeltas.push([b, a]);
        }));

        this.moveDeltas = moveDeltas;
    }

    availableMoves() {
        return this.moveDeltas
            .map(delta => this.pos.add(delta[0], delta[1]))
            .map(pos => this.evaluateMove(this, pos))
            .filter(move => move.allowed);
    }

    evaluateMove(piece, pos) {
        if (!piece.board.validPos(pos)) return new DisallowedMove();

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
            return new NormalMove(false, piece.pos, pos);
        }
    }
}
