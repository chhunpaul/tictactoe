import React from "react";

export default class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {board: {}, winner: "", gameCompleted: false};
        this.sections = [];
        this.handleClick = this.handleClick.bind(this);
        this.createRef = this.createRef.bind(this);
    }

    createRef = element => {
        this.sections.push(element.props.id)
    };

    botMove(state) {
        const botMove = this.sections[Math.floor(Math.random() * this.sections.length)];
        this.sections.splice(this.sections.indexOf(botMove), 1);
        state.board[botMove] = "bot";

        const winner = this.calculateWinner(state.board);
        if (winner) {
            state.winner = winner;
        }
    }

    handleClick(e) {
        const state = this.state;
        if (state.winner) {
            return
        }

        const targetID = e.target.id;

        if (this.sections.indexOf(targetID) < 0) {
            return
        }

        state.board[targetID] = "player";
        this.sections.splice(this.sections.indexOf(targetID), 1);
        const winner = this.calculateWinner(state.board);
        if (winner) {
            state.winner = winner;
        } else {
            this.botMove(state);
        }
        if (this.sections.length === 0) {
            state.gameCompleted = true;
        }
        this.setState(state)
    }

    _checkForWinner(data) {
        for (const d of data) {
            if (d.every(val => val === "player")) {
                return "player"
            }
            if (d.every(val => val === "bot")) {
                return "bot"
            }
        }
        return ""
    }

    checkForRowWinner(board) {
        return this._checkForWinner([
            [board["R0_C0"], board["R0_C1"], board["R0_C2"]],
            [board["R1_C0"], board["R1_C1"], board["R1_C2"]],
            [board["R2_C0"], board["R2_C1"], board["R2_C2"]],
        ]);
    }

    checkForColumnWinner(board) {
        return this._checkForWinner([
            [board["R0_C0"], board["R1_C0"], board["R2_C0"]],
            [board["R0_C1"], board["R1_C1"], board["R2_C1"]],
            [board["R0_C2"], board["R1_C2"], board["R2_C2"]],
        ]);
    }

    checkForDiagonalWinner(board) {
        return this._checkForWinner([
            [board["R0_C0"], board["R1_C1"], board["R2_C2"]],
            [board["R0_C2"], board["R1_C1"], board["R2_C0"]],
        ]);
    }

    calculateWinner(board) {
        const rowWinner = this.checkForRowWinner(board);
        if (rowWinner) {
            return rowWinner
        }
        const columnWinner = this.checkForColumnWinner(board);
        if (columnWinner) {
            return columnWinner
        }
        const diagonalWinner = this.checkForDiagonalWinner(board);
        if (diagonalWinner) {
            return diagonalWinner
        }
        return ""
    }

    render() {
        return (
            <div>
                <svg width="300" height="300" onClick={this.handleClick}> :
                    <Section ref={this.createRef} id="R0_C0" owner={this.state.board["R0_C0"]} rowIndex={0}
                             columnIndex={0}/>
                    <Section ref={this.createRef} id="R0_C1" owner={this.state.board["R0_C1"]} rowIndex={0}
                             columnIndex={1}/>
                    <Section ref={this.createRef} id="R0_C2" owner={this.state.board["R0_C2"]} rowIndex={0}
                             columnIndex={2}/>
                    <Section ref={this.createRef} id="R1_C0" owner={this.state.board["R1_C0"]} rowIndex={1}
                             columnIndex={0}/>
                    <Section ref={this.createRef} id="R1_C1" owner={this.state.board["R1_C1"]} rowIndex={1}
                             columnIndex={1}/>
                    <Section ref={this.createRef} id="R1_C2" owner={this.state.board["R1_C2"]} rowIndex={1}
                             columnIndex={2}/>
                    <Section ref={this.createRef} id="R2_C0" owner={this.state.board["R2_C0"]} rowIndex={2}
                             columnIndex={0}/>
                    <Section ref={this.createRef} id="R2_C1" owner={this.state.board["R2_C1"]} rowIndex={2}
                             columnIndex={1}/>
                    <Section ref={this.createRef} id="R2_C2" owner={this.state.board["R2_C2"]} rowIndex={2}
                             columnIndex={2}/>
                </svg>
                <div>
                    {this.state.winner === "player" ? "You win!" : ""}
                    {this.state.winner === "bot" ? "You lose!" : ""}
                    {this.state.winner === "" && this.state.gameCompleted === true ? "Draw!" : ""}
                </div>
            </div>
        )
    }
}

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.sectionHeight = 100;
        this.sectionWidth = 100;
        this.rowIndex = props.rowIndex;
        this.columnIndex = props.columnIndex;
    }

    createX() {
        return (
            <g style={{stroke: "#FFF"}}>
                <line x1="20" y1="20" x2="80" y2="80"></line>
                <line x1="20" y1="80" x2="80" y2="20"></line>
            </g>
        )
    }

    // to do make it draw a circle instead?
    createO() {
        return (
            <g style={{stroke: "#ff0000"}}>
                <line x1="20" y1="20" x2="80" y2="80"></line>
                <line x1="20" y1="80" x2="80" y2="20"></line>
            </g>
        )
    }

    render() {
        const styles = {
            fill: "#14bdac",
            transform: `translate(${this.columnIndex * this.sectionHeight}px, ${this.rowIndex * this.sectionWidth}px)`,
        };
        const id = `R${this.rowIndex}_C${this.columnIndex}`;
        return (
            <g style={styles}>
                <rect id={id} width={this.sectionWidth} height={this.sectionHeight}/>
                {this.props.owner === "player" ? this.createX() : ""}
                {this.props.owner === "bot" ? this.createO() : ""}
            </g>
        )
    }
}
