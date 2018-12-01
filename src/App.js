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
            },
            board: ['', '', '', '', '', '', '', '', '']
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
            gameStarted: false,
            message: {
                visibility: true,
                message: "Choose number of players",
                rest: (<div  id="msgRest">
                    <button id="1P" onClick={()=> this.choosePlayer(1) } className="btn">One Player</button>
                    <button id ="2P" onClick = {()=>  this.choosePlayer(2) } className = "btn" > Two Player </button>
                </div>)
            },
            occupiedCount: 0,
            board: ['', '', '', '', '', '', '', '', '']
        })
    }


    // Game Logic
    setupBoard = ()=>{
        this.setState({
            occupiedCount: 0,
            board: ['', '', '', '', '', '', '', '', '']
        })
    }
    CPU = (forceDifficult)=> {
        if (this.state.difficulty === 0 && !forceDifficult){
            var IO = Math.floor(Math.random()*2);
            if (IO === 0) {
                var freeSlots = [];
                for (var i=0; i<9; i++){
                    if(this.state.board[i] == '')
                        freeSlots.push(i);
                }
                var random = Math.floor(Math.random()*freeSlots.length);
                game(freeSlots[random]);
            }
            else {
                CPU(true);
            }
        }
        else {
            var origBoard = [];
            for (var i=0; i<9; i++)
                origBoard.push(this.state.board[i]===''? i : this.state.board[i] );
            this.state.fc = 0;
            var bestSpot = this.minimax(origBoard, playerTwoXO);
            var n = bestSpot.index;
            this.game(n);
        }
    }
    game= (n)=>{
        if(this.state.board[n] == ''){
            this.state.board[n] = this.state.currentPlayer;
            this.state.occupiedCount++;
            if(!this.gameOver(n, occupiedCount)){
                if(this.state.currentPlayer == this.state.playerOneXO){
                    this.state.currentPlayer = this.state.playerTwoXO;
                    // $("#playerHighlighter").animate({left: "310px"}); //TODO
                }
                else {
                    this.state.currentPlayer = this.state.playerOneXO;
                    // $("#playerHighlighter").animate({left: "210px"});
                }
                if (this.state.oneP && this.state.currentPlayer == this.state.playerTwoXO){
                    setTimeout(this.CPU, 500);// Thinking time
                }
            }
            else{
                this.updateScore;
                setTimeout(this.setupBoard, 2500);
                setTimeout(function(){this.state.message.visibility=false}, 2000) //
                if (this.state.oneP && this.state.currentPlayer == this.state.playerTwoXO){
                    setTimeout(this.CPU, 3000);//Thinking time
                }
            }
        }
    }
    gameOver = (n, occupiedCount) => {
        const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
        if(this.state.occupiedCount <= 9){
            for (var j=0; j<8; j++){
                if(winCombos[j].indexOf(n+1) != -1) {
                    var a = this.state.board[winCombos[j][0]];
                    var b = this.state.board[winCombos[j][1]];
                    var c = this.state.board[winCombos[j][2]];
                    if(a == this.state.currentPlayer && b == this.state.currentPlayer && c == this.state.currentPlayer){
                        // $("#"+winCombos[j][0]).css("background", "white"); TODO
                        // $("#"+winCombos[j][1]).css("background", "white");
                        // $("#"+winCombos[j][2]).css("background", "white");
                        if (this.state.oneP && this.state.currentPlayer == this.state.playerOneXO){
                            this.setState({
                                message:{
                                    visibility: true,
                                    message: "Congragulations!!!",
                                    rest: (<h3>You've won the game!</h3>)
                                }
                            })
                            this.state.pOneWins++;
                        }
                        else if (oneP) {
                            this.setState({
                                message:{
                                    visibility: true,
                                    message: "Uh oh!",
                                    rest: (<h3>You've lost!</h3>)
                                }
                            })
                            this.state.pTwoWins++;
                        }
                        else if (this.state.currentPlayer == this.state.playerOneXO){
                            this.state.winner = "Player 1";
                            this.state.pOneWins++;
                            this.setState({
                                message:{
                                    visibility: true,
                                    message: "Congragulations!!!",
                                    rest: (<h3>Player 1 won the game!</h3>)
                                }
                            })
                        }
                        else{
                            this.state.winner = "Player 2";
                            this.state.pTwoWins++;
                            this.setState({
                                message:{
                                    visibility: true,
                                    message: "Congragulations!!!",
                                    rest: (<h3>Player 2 won the game!</h3>)
                                }
                            })
                        }
                        return true;
                    }
                }
            }
        }
        if(this.state.occupiedCount == 9){
            this.setState({
                message:{
                    visibility: true,
                    message: "Its a draw.",
                    rest: (<h3>Better luck next time</h3>)
                }
            })
            return true;
        }
        else{
            return false;
        }
    }
    updateScore = () => {
        var P1 = "Player";
        var P2 = "CPU";
        if(!this.state.oneP){
            P1 = "Player " + playerOneXO;
            P2 = "Player " + playerTwoXO;
        }
        // $("#score").html('<b>'+P1+': '+pOneWins+'<span style="display:inline-block; width: 20px;"></span>'+P2+': '+pTwoWins+'</b><button id="resetBtn" onclick="reset()"><i class="fa fa-undo" aria-hidden="true"> Reset</i></button>'); TODO
    }
    minimax = (newBoard, player) => {
        this.state.fc++;
        var availSpots = this.emptyIndexies(newBoard);
        if (this.winning(newBoard, this.state.playerOneXO)){
            return {score:-10};
        }
        else if (winning(newBoard, this.state.playerTwoXO)){
            return {score:10};
        }
        else if (availSpots.length === 0){
            return {score:0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++){
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            if (player == this.state.playerTwoXO){
                var result = this.minimax(newBoard, this.state.playerOneXO);
                move.score = result.score;
            }
            else{
                var result = this.minimax(newBoard, this.state.playerTwoXO);
                move.score = result.score;
            }
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
        var bestMove;
        if(player === this.state.playerTwoXO){
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else{
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
    emptyIndexies= (board) =>{
        return  board.filter(s => s != "O" && s != "X");
    }
    winning = (board, player) => {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
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
                            <h4 id="score">
                                <b>Player {this.state.playerOneXO}: {this.state.pOneWins}
                                    <span style={{display:"inlineBlock", width: "20px"}}></span>
                                    Player {this.state.playerTwoXO}: {this.state.pTwoWins}</b>
                                <button id="resetBtn" onClick={this.reset}><i className="fa fa-undo" aria-hidden="true"> Reset</i></button>
                            </h4>
                            <div id="tableContainer">
                                <table>
                                    <tr>
                                        <td id="1" onClick={()=>this.game(1)}>{this.state.board[0]}</td>
                                        <td className="center" id="2" onClick={()=>this.game(2)}>{this.state.board[1]}</td>
                                        <td id="3" onClick={()=>this.game(3)}>{this.state.board[2]}</td>
                                    </tr>
                                    <tr>
                                        <td className="middle" id="4" onClick={()=>this.game(4)}>{this.state.board[3]}</td>
                                        <td className="middle-center" id="5" onClick={()=>this.game(5)}>{this.state.board[4]}</td>
                                        <td className="middle" id="6" onClick={()=>this.game(6)}>{this.state.board[5]}</td>
                                    </tr>
                                    <tr>
                                        <td id="7" onClick={()=>this.game(7)}>{this.state.board[6]}</td>
                                        <td className="center" id="8" onClick={()=>this.game(8)}>{this.state.board[7]}</td>
                                        <td id="9" onClick={()=>this.game(9)}>{this.state.board[8]}</td>
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
