import React, { Component } from 'react';
import MessagePopup from './MessagePopup';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        // Set default state
        this.state = {
            oneP: true,
            winner: "Player 1",
            difficulty: 0,
            playerOneXO: 'X',
            playerTwoXO: 'O',
            pOneWins: 0,
            pTwoWins: 0,
            firstTurn: 1,
            currentPlayer: 'X',
            occupiedCount: 0,
            gameStarted: false,
            fc: 0,
            message: {
                visibility: true,
                message: "Choose number of players",
                rest: (<div  id="msgRest">
                    <button id="1P" onClick={()=> this.choosePlayer(1) } className="btn">One Player</button>
                    <button id ="2P" onClick = {()=>  this.choosePlayer(2) } className = "btn" > Two Player </button>
                </div>)
            }
        };

    }

    /* Custom functions */
    choosePlayer = (n) => { // Set single players game
        console.log(n)
        this.setState({
            message:{
                visibility: true,
                message: "Choose difficulty level",
                rest: (
                    <div  id="msgRest">
                        <button id="easy" onClick={()=> this.chooseDifficulty(0)} className="btn">Easy</button>
                        <button id="difficult" onClick={()=> this.chooseDifficulty(1)} className="btn">Hard</button>
                    </div>
                )
            },
            oneP: n==1
        })
    }
    chooseDifficulty = (n)=>{
        console.log(n)
        let msg = {
            visibility: true,
            rest: (<div  id="msgRest">
                <button id="X" onClick={()=> this.chooseXO('X')} className="btn">X</button>
                <button id="2P" onClick={()=> this.chooseXO('O')} className="btn">O</button>
            </div>)
        };
        if(true)
            msg.message = "Choose X or O";
        else
            msg.message = "Player One, choose X or O";
        this.setState({
            message: msg,
            difficulty: n
        })
    }
    chooseXO = (a)=>{
        this.setState({
            playerOneXO: a,
            playerTwoXO: a=='X' ? 'O' : 'X',
            message:{ visibility: false }
        })
    }
    reset = () => {
        this.setState({
            pOneWins: 0,
            pTwoWins: 0,
            occupiedCount: 0,
            gameStarted: false,
            message: {
                visibility: true,
                message: "Choose number of players",
                rest: (<div  id="msgRest">
                    <button id="1P" onClick={()=> this.choosePlayer(1) } className="btn">One Player</button>
                    <button id ="2P" onClick = {()=>  this.choosePlayer(2) } className = "btn" > Two Player </button>
                </div>)
            }
        })
    }


    /* Constants */
    // const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]]


    render() {
        return (
            <div className="App">
                <div className='pca-hold'>
                    <div className='pca-main'> {/*!--Screen--*/}
                        <div className='pca-inner' id="gameScr">
                            <MessagePopup message={this.state.message} />
                            <h1> Tic Tac Toe</h1>
                            <div id="playerHighlighter"></div>
                            <h4 id="score"><b>Player O: 0<span style={{display:"inlineBlock", width: "20px"}}></span>Player X:
                                0</b>
                                <button id="resetBtn" onClick="reset()"><i className="fa fa-undo"
                                                                           aria-hidden="true"> Reset</i>
                                </button>
                            </h4>
                            <div id="tableContainer">
                                <table>
                                    <tr>
                                        <td id="1" onClick="game(1)"></td>
                                        <td className="center" id="2" onClick="game(2)"></td>
                                        <td id="3" onClick="game(3)"></td>
                                    </tr>
                                    <tr>
                                        <td className="middle" id="4" onClick="game(4)"></td>
                                        <td className="middle-center" id="5" onClick="game(5)"></td>
                                        <td className="middle" id="6" onClick="game(6)"></td>
                                    </tr>
                                    <tr>
                                        <td id="7" onClick="game(7)"></td>
                                        <td className="center" id="8" onClick="game(8)"></td>
                                        <td id="9" onClick="game(9)"></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        {/*!<!-- 'pca-inner' -->*/}

                    </div>
                    {/*!-- /Screen --*/}
                    <div className='pca-sub'>
                        <div className='pca-top'></div>
                        <div className='pca-mid'>
                            <div className='pca-part'></div>
                        </div>
                        {/*!-- 'pca-mid' --*/}
                        <div className='pca-bot'></div>
                    </div>
                    {/*<!-- 'pca-bot' -->*/}
                </div>
                {/*<!-- 'pca-hold' -->*/}
            </div>
        );
    }
}

export default App;
