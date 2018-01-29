import { NormalMove, CaptureMove, ChessPiece, evaluateMove } from './PieceCommon';

// todo promotion
// todo en passant (if the other pawn just moved 2, this can diagonal capture it as though it had only moved 1)
export default class Pawn extends ChessPiece {
    constructor(pos, color, board) {
        super('P', pos, color, board);
    }

    hasMoved() {
        return Math.abs(this.color.homeRow - this.pos.row) > 1;
    }

    // some of this is terrible. or maybe all of it
    availableMoves() {
        const forward = this.color.advanceDirection;
        const advanceLimit = forward * (this.hasMoved() ? 2 : 3);
        const advances = [];

        // the most uncomfortable for loop I've ever written
        for (var distance = forward; distance !== advanceLimit; distance += forward) {
            var targetPos = this.pos.add(distance, 0);
            if (this.board.pieceAt(targetPos)) break;
            if (this.board.validPos(targetPos)) {
                advances.push(new NormalMove(false, this, targetPos));
            }
        }

        const captures = [[forward, -1], [forward, 1]]
            .map(delta => this.pos.add(delta[0], delta[1]))
            .map(pos => evaluateMove(this, pos, false))
            .filter(move => move instanceof CaptureMove);

        return advances.concat(captures);
    }
}
