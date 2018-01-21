import { CaptureMove, ChessPiece, repeatMove, evaluateMove } from './PieceCommon';

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
        const maxAdvance = this.hasMoved() ? 1 : 2;
        const forward = this.color.advanceDirection;
        const advances = repeatMove(this, [forward, 0]).filter(move => Math.abs(move.targetPos.row - this.pos.row) <= maxAdvance);

        const captures = [[forward, -1], [forward, 1]]
            .map((delta) => this.pos.add(delta[0], delta[1]))
            .map(pos => evaluateMove(this, pos, false))
            .filter(move => move instanceof CaptureMove);

        return advances.concat(captures);
    }
}
