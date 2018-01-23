export default class MoveHistory {
    constructor() {
        this.doneMoves = [];
        this.undoneMoves = [];
    }

    movePairs() {
        let result = [];
        for (var i = 0; i < this.doneMoves.length; i += 2) {
            result.push(this.doneMoves.slice(i, i + 2));
        }

        return result;
    }

    push(move) {
        this.doneMoves.push(move)
    }
}