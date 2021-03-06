﻿import * as React from 'react';

export class EmptySquare extends React.PureComponent {
    render() {
        var ps = this.props;
        return <div className={this.props.className} onClick={() => ps.handleClick(ps.x, ps.y)} />;
    }
}

export class OccupiedSquare extends React.PureComponent {
    render() {
        var ps = this.props;
        var piece = ps.piece;
        let cls = piece.classes.join(' ');
        return <div style={{ color: piece.color.colorHex }} className={cls} onClick={ps.handleClick}>{ps.display}</div>;
    }
}
