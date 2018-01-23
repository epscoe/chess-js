export class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    notation() {
        let colChar = String.fromCharCode(97 + this.col);
        return `${colChar}${this.row + 1}`;
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
    homeRow: 0,
    enemyRow: 7,
    advanceDirection: 1
};

export const Black = {
    colorName: 'black',
    colorHex: '#000000',
    homeRow: 7,
    enemyRow: 0,
    advanceDirection: -1
};

export class Move {
    constructor(allowed, canContinue, color) {
        this.allowed = allowed;
        this.canContinue = canContinue;
        this.color = color;
    }

    execute() {
        console.log('did nothing');
    }

    notation() {
        return 'INVALID';
    }
}

export class DisallowedMove extends Move {
    constructor() {
        super(false, false, undefined);
    }
}

export class NormalMove extends Move {
    constructor(canContinue, piece, targetPos) {
        super(true, canContinue, piece.color);
        this.piece = piece;
        this.startPos = piece.pos;
        this.targetPos = targetPos;
    }

    execute(board) {
        this.piece.pos = this.targetPos;
    }

    notation() {
        // this isn't standard algebraic
        return `${this.startPos.notation()}-${this.targetPos.notation()}`;
    }
}

export class CaptureMove extends NormalMove {
    constructor(canContinue, piece, targetPiece) {
        super(canContinue, piece, targetPiece.pos, piece.color);
        this.targetPiece = targetPiece;
    }

    execute(board) {
        board.removePiece(this.targetPiece);
        super.execute(board);
    }

    notation() {
        // this isn't standard algebraic
        return `${this.piece.identifier}x${this.targetPos.notation()}`;
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

export function evaluateMove(piece, pos, repeatable = true) {
    if (!piece.board.validPos(pos)) return new DisallowedMove();

    var targetPiece = piece.board.pieceAt(pos);
    if (targetPiece) {
        if (targetPiece.color === piece.color) {
            return new DisallowedMove();
        }
        else {
            return new CaptureMove(false, piece, targetPiece);
        }
    }
    else {
        return new NormalMove(repeatable, piece, pos);
    }
}

export const repeatMove = (piece, delta) => {
    let moves = [];
    let nextPos = piece.pos;
    let done = false;
    while (!done) {
        nextPos = nextPos.add(delta[0], delta[1]);
        let result = evaluateMove(piece, nextPos);
        if (result.allowed) moves.push(result);
        done = !result.canContinue;
    }

    return moves;
}

