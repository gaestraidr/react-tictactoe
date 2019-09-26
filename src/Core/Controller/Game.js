import React, { Component } from 'react';

import '../../Asset/Style/Game.css';

import Board from "../Component/Board";
import UserPrompt from "./UserPrompt";
import { SquareTypes, GameStates, GameConclusion } from "../Data/TypedValue"

class Game extends Component {
    constructor(props) {
        super(props);
        const DEFAULT_SIZE = 3;

        this.state = {
            currentFiller: SquareTypes.CROSS,
            gameStates: GameStates.PREPARING,
            gameConclusion: GameConclusion.TBD,
            selectedGridSize: DEFAULT_SIZE,
            squareRows: Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(SquareTypes.NONE),
            compiledId: []
        }

        this.changeHappen = this.changeHappen.bind(this);
        this.prepareBoard = this.prepareBoard.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        const DEFAULT_SIZE = 3;

        this.setState({
            currentFiller: SquareTypes.CROSS,
            gameStates: GameStates.PREPARING,
            gameConclusion: GameConclusion.TBD,
            selectedGridSize: DEFAULT_SIZE,
            squareRows: Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(SquareTypes.NONE),
            compiledId: []
        });
    }

    changeHappen(id) {
        const size = this.state.selectedGridSize;
        const updatedSquareRows = this.state.squareRows.slice();
        const newComId = this.state.compiledId.slice();
        var hasChainWinning = false;
        var isDraw = false;

        updatedSquareRows[id] = this.state.currentFiller;
        newComId.push(id);
        // Check for diagonal letter chain
        for (var i = 0; i < (size * size); i += size + 1) {
            if (updatedSquareRows[i] !== this.state.currentFiller)
                break;
            else if (i === (size * size) - 1)
                hasChainWinning = true;
        }

        // Check for inline letter chain
        for (i = 0; i < (size * size); i += size) {
            for (var j = i; j < (i + size); j++) {
                if (updatedSquareRows[j] !== this.state.currentFiller)
                    break;
                else if (j === (i + size) - 1)
                    hasChainWinning = true;
            }
        }

        // Check for rundown letter chain
        for (i = 0; i < size; i++) {
            for (j = i; j < (size * size); j += size) {
                if (updatedSquareRows[j] !== this.state.currentFiller)
                    break;
                else if (j === ((size * size) - 1) - ((size - 1) - i))
                    hasChainWinning = true;
            }
        }

        // Check for reverse-diagonal letter chain
        for (i = size - 1; i < (size * size); i += size - 1) {
            if (updatedSquareRows[i] !== this.state.currentFiller)
                break;
            else if (i === ((size * size) - 1) - (size - 1))
                hasChainWinning = true;
        }

        // Check for draw
        if (!hasChainWinning) {
            for (i = 0; i < (size * size); i++) {
                if (updatedSquareRows[i] === SquareTypes.NONE)
                    break;
                else if (i === (size * size) - 1)
                    isDraw = true;
            }
        }

        if (hasChainWinning || isDraw) {
            this.setState({
                gameStates: GameStates.ENDED,
                gameConclusion: isDraw ? GameConclusion.DRAW : GameConclusion.HAS_WINNER
            });
        }
        else {
            this.setState((state) => ({
                currentFiller: state.currentFiller !== SquareTypes.CROSS ? SquareTypes.CROSS : SquareTypes.CIRCLE,
                squareRows: updatedSquareRows.slice(),
                compiledId: newComId
            }));
        }
    }

    prepareBoard(gridSize) {
        this.setState({
            gameStates: GameStates.PLAYING,
            selectedGridSize: gridSize,
            squareRows: Array(gridSize * gridSize).fill(SquareTypes.NONE)
        });
    }

    render() {
        if (this.state.gameStates === GameStates.PREPARING) {
            return (
                <div className="Game">
                    <header id="root-content" className="Game-header">
                        <UserPrompt startGameHandler={this.prepareBoard}/>
                    </header>
                </div>
            );
        }
        else if (this.state.gameStates === GameStates.PLAYING) {
            return (
                <div className="Game">
                    <header id="root-content" className="Game-header">
                        <div className="Game-text-header">
                            Player {this.state.currentFiller}'s turns to play
                        </div>
                        <Board
                            gridSize={this.state.selectedGridSize}
                            filler={this.state.currentFiller}
                            reportChange={this.changeHappen} />
                        </header>
                </div>
            );
        }
        else { // GameStates.ENDED
            const endMessage = this.state.gameConclusion === GameConclusion.HAS_WINNER ?
                "Player " + this.state.currentFiller + "'s has won the game!" :
                "The game ended with draw!"
            return (
                <div className="Game">
                    <header id="root-content" className="Game-header">
                        <div className="Game-text-header">
                            {endMessage}
                            <br /> <br />
                            <button className="Game-button" onClick={() => this.reset()}>
                                Play Again
                            </button>
                        </div>
                    </header>
                </div>
            );
        }
    }
}

export default Game;
