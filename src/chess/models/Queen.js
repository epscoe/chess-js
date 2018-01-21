import { ChessPiece, repeatMove } from './PieceCommon';

export default class Queen extends ChessPiece {
    constructor(pos, color, board) {
        super('Q', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        return deltas.reduce((acc, delta) => acc.concat(repeatMove(this, delta)), []);
    }
}
