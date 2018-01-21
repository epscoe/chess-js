import { ChessPiece, repeatMove } from './PieceCommon';

export default class Rook extends ChessPiece {
    constructor(pos, color, board) {
        super('R', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return deltas.reduce((acc, delta) => acc.concat(repeatMove(this, delta)), []);
    }
}
