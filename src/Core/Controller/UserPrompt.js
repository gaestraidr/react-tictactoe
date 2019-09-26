import React, { Component } from 'react';

import "../../Asset/Style/UserPrompt.css";

class UserPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promptMessage: "How many grid in the board you want to play with?",
            promptErrorMessage: null,
            gridSize: 0,
            userInput: null
            //chainSize: 0 -- Unused for now
        }

        // Another day another binding... well, one binding... hope not more.
        this.processPrompt = this.processPrompt.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    handleOnChangeInput(ev) {
        this.setState({
            userInput: ev.target.value
        });
    }

    processPrompt() {
        if (this.state.userInput == null || 
            !this.state.userInput.length || isNaN(this.state.userInput)) {
            this.setState({
                promptErrorMessage: "Please put in only a number!"
            });
            return;
        }

        this.props.startGameHandler(Number(this.state.userInput));
    }

    render() {
        return (
            <div>
                <div className="Prompt-desc">
                    {this.state.promptMessage}
                    <p style={{ color: '#b71c1c' }}>{this.state.promptErrorMessage}</p>
                </div>
                <input
                    id="user-input"
                    className="Input-text"
                    onChange={this.handleOnChangeInput}
                    value={this.state.userInput}
                />
                <br />
                <button className="Game-button" onClick={() => this.processPrompt()}>
                    Start
                </button>
            </div>
        );
    }
}

export default UserPrompt;
