import React, { Component } from 'react';

class TicTacToeTable extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div id="tableContainer">
                <table>
                    <tbody>
                    <tr>
                        <td id="1" onClick={()=>this.props.game(0)}>{this.props.board[0]}</td>
                        <td className="center" id="2" onClick={()=>this.props.game(1)}>{this.props.board[1]}</td>
                        <td id="3" onClick={()=>this.props.game(2)}>{this.props.board[2]}</td>
                    </tr>
                    <tr>
                        <td className="middle" id="4" onClick={()=>this.props.game(3)}>{this.props.board[3]}</td>
                        <td className="middle-center" id="5" onClick={()=>this.props.game(4)}>{this.props.board[4]}</td>
                        <td className="middle" id="6" onClick={()=>this.props.game(5)}>{this.props.board[5]}</td>
                    </tr>
                    <tr>
                        <td id="7" onClick={()=>this.props.game(6)}>{this.props.board[6]}</td>
                        <td className="center" id="8" onClick={()=>this.props.game(7)}>{this.props.board[7]}</td>
                        <td id="9" onClick={()=>this.props.game(8)}>{this.props.board[8]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TicTacToeTable;
