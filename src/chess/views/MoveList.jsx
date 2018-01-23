import * as React from 'react';

export default class MoveList extends React.Component {
    render() {
        return <div className="vertical-section">
            <table className="move-list">
                <thead><tr><th /><td><h4>White</h4></td><td><h4>Black</h4></td></tr></thead>
                <tbody>
                    {this.props.moveHistory.movePairs().map((pair, idx) =>
                        <tr key={idx}>
                            <th>{idx + 1}.</th>
                            <td>{pair[0].notation()}</td>
                            <td>{pair[1] && pair[1].notation()}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;
    }
}