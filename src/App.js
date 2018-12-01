import React, { Component } from 'react';
import MessagePopup from './MessagePopup';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
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
        winCombos: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]],
        fc: 0,
        message: {
          visibility: true,
          message: "Choose number of players",
          rest: (<div>
                  <button id="1P" onClick="singleP()" className="btn">One Player</button>
                  <button id ="2P" onClick = "twoP()" className = "btn" > Two Player </button>
                </div>)
        }
      };
  }
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
