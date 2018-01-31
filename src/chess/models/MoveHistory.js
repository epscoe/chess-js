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

    pushDone(move, isRedo) {
        this.doneMoves.push(move)
        if (!isRedo) this.undoneMoves = [];
    }

    pushUndone(move) {
        this.undoneMoves.push(move)
    }

    undoLast(game) {
        if (this.doneMoves.length > 0) {
            let move = this.doneMoves.pop();
            game.undoMove(move);
        }
    }

    redoLast(game) {
        if (this.undoneMoves.length > 0) {
            let move = this.undoneMoves.pop();
            game.executeMove(move, true);
        }
    }
}