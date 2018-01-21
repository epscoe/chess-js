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

export class DisallowedMove extends Move {
    constructor() {
        super(false, false);
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
