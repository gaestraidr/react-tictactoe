import React, { Component } from 'react';

import { SquareTypes } from "../Data/TypedValue"
import "../../Asset/Style/Square.css"

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squareId: props.squareId,
            isVisible: props.visibility,
            isFilled: false,
            theFiller: SquareTypes.NONE
        };

        this.fillOnClick = this.fillOnClick.bind(this);
    }

    fillOnClick(seedFiller) {
        if (!this.state.isFilled) {
            this.setState({
                isFilled: true,
                theFiller: seedFiller
            });

            this.props.reportChange(this.state.squareId);
        }
    }

    render() {
        const multiplier = 7 * this.props.shrinkMultiplier
        const squareSizeStyle = {
            fontSize: multiplier < 50 ? 90 - multiplier : 40,
            height: multiplier < 50 ? 100 - multiplier : 50,
            width: multiplier < 50 ? 100 - multiplier : 50
        };

        return this.state.isVisible ? (
            <button className="square" style={squareSizeStyle} onClick={() => this.fillOnClick(this.props.filler)}>
                {this.state.theFiller}
            </button>
        ) : (
            <div />
        );
    }
}

export default Square;
