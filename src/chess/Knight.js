import { Position, DisallowedMove, NormalMove, CaptureMove, ChessPiece, evaluateMove } from './PieceCommon';

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
            .map(pos => evaluateMove(this, pos))
            .filter(move => move.allowed);
    }
}
