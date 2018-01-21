export class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    add(rowDelta, colDelta) {
        return new Position(this.row + rowDelta, this.col + colDelta);
    }

    equivalent(pos) {
        return this.row === pos.row && this.col === pos.col;
    }
}

export const White = {
    colorName: 'white',
    colorHex: '#FFFFFF',
    homeRow: 7,
    enemyRow: 0,
    advanceDirection: -1
};

export const Black = {
    colorName: 'black',
    colorHex: '#000000',
    homeRow: 0,
    enemyRow: 7,
    advanceDirection: 1
};

export class Move {
    constructor(allowed, canContinue) {
        this.allowed = allowed;
        this.canContinue = canContinue;
    }

    execute() {
        console.log('did nothing');
    }
}

export class NormalMove extends Move {
    constructor(canContinue, sourcePos, targetPos) {
        super(true, canContinue);
        this.sourcePos = sourcePos;
        this.targetPos = targetPos;
    }

    execute(board) {
        let piece = board.pieceAt(this.sourcePos);
        piece.pos = this.targetPos;
    }
}

export class CaptureMove extends NormalMove {
    execute(board) {
        let capturedPiece = board.pieceAt(this.targetPos);
        board.removePiece(capturedPiece);
        super.execute(board);
    }
}

export class ChessPiece {
    constructor(identifier, pos, color, board) {
        this.identifier = identifier;
        this.pos = pos;
        this.color = color;
        this.board = board;
        this.classes = [];
        this.selected = false;
    }

    resetClass() { this.classes = []; }
    setClass(cls) { this.classes.push(cls); }
}

export class Rook extends ChessPiece {
    constructor(pos, color, board) {
        super('R', pos, color, board);
    }

    availableMoves() {
        let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return deltas.reduce((acc, delta) => acc.concat(this.repeatableMove(this, delta)), []);
    }

    repeatableMove(piece, delta) {
        let moves = [];
        let nextPos = piece.pos;
        let done = false;
        while (!done) {
            nextPos = nextPos.add(delta[0], delta[1]);
            if (!piece.board.validPos(nextPos)) break;

            let result = piece.evaluateMove(piece, nextPos);
            if (result.allowed) moves.push(result);
            done = !result.canContinue;
        }

        return moves;
    }

    evaluateMove(piece, pos) {
        var targetPiece = piece.board.pieceAt(pos);
        if (targetPiece) {
            if (targetPiece.color.colorName === piece.color.colorName) {
                return new Move(false, false);
            }
            else {
                return new CaptureMove(false, piece.pos, pos);
            }
        }
        else {
            return new NormalMove(true, piece.pos, pos);
        }
    }
}

export class Knight extends Rook {
    constructor(pos, color, board) {
        super(pos, color, board);
        this.identifier = 'N';
    }
}