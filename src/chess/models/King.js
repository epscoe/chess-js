import { ChessPiece, evaluateMove } from './PieceCommon';

export default class King extends ChessPiece {
    constructor(pos, color, board) {
        super('K', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        return deltas
            .map(delta => this.pos.add(delta[0], delta[1]))
            .map(pos => evaluateMove(this, pos))
            .filter(move => move.allowed);
    }
}
