import { ChessPiece, repeatMove } from './PieceCommon';

export default class Bishop extends ChessPiece {
    constructor(pos, color, board) {
        super('B', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
        return deltas.reduce((acc, delta) => acc.concat(repeatMove(this, delta)), []);
    }
}
