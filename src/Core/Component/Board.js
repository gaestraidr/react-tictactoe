import React, { Component } from 'react';

import Square from "./Square";

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardSize: props.gridSize
        }
    }

    render() {
        let rows = [];
        const size = this.state.boardSize;
        const multiplier = size - 3;

        var idCount = 0;

        for (var i = 0; i < size; i++) {

            var squares = [];
            for (var j = 0; j < size; j++) {
                squares.push(<Square
                    visibility={true}
                    squareId={idCount}
                    filler={this.props.filler}
                    reportChange={this.props.reportChange}
                    shrinkMultiplier={multiplier} />);

                idCount++;
            }

            rows.push(<div className="board-row">{squares}</div>);
        }

        return (
            <div>
                {rows}
            </div>
        );
    }

}

export default Board;
