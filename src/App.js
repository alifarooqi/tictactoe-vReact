import React, { Component } from 'react';
import MessagePopup from './MessagePopup';
import TicTacToeTable from './TicTacToeTable';
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

    componentDidMount(){
        document.onkeypress = this.keypadHandler;
    }

    /* Custom functions */
    choosePlayer = (n) => { // Set single players game
        if (n==2){
            this.setState({oneP: false});
            this.chooseDifficulty(0, true);
        }
        else {
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
                oneP: true
            })
        }
    }
    chooseDifficulty = (n, isOneP)=>{
        let msg = {
            visibility: true,
            rest: (<div  id="msgRest">
                <button id="X" onClick={()=> this.chooseXO('X')} className="btn">X</button>
                <button id="2P" onClick={()=> this.chooseXO('O')} className="btn">O</button>
            </div>)
        };
        if(this.state.oneP && !isOneP)
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
            currentPlayer: a,
            message:{ visibility: false },
            gameStarted: true
        });
        document.getElementById("playerHighlighter").style.display = "block";
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
                this.game(freeSlots[random]);
            }
            else {
                this.CPU(true); //Force CPU to play in difficult mode
            }
        }
        else {
            var origBoard = [];
            for (var i=0; i<9; i++)
                origBoard.push(this.state.board[i]===''? i : this.state.board[i] );
            this.state.fc = 0;
            var bestSpot = this.minimax(origBoard, this.state.playerTwoXO);
            var n = bestSpot.index;
            this.game(n);
        }
    }
    game= (n)=>{
        if(this.state.board[n] == ''){
            let newBoard = this.state.board;
            let occupiedCount = this.state.occupiedCount+1;
            newBoard[n] = this.state.currentPlayer;
            var playerWhoJustPlayed = this.state.currentPlayer;
            this.setState({
                board: newBoard,
                occupiedCount: occupiedCount
            });
            if(!this.gameOver(n, occupiedCount)){
                if(this.state.currentPlayer == this.state.playerOneXO){
                    this.setState({currentPlayer: this.state.playerTwoXO});
                    document.getElementById('playerHighlighter').style.left = "310px"
                }
                else {
                    this.setState({currentPlayer: this.state.playerOneXO});
                    document.getElementById('playerHighlighter').style.left = "210px"
                }
                if (this.state.oneP && playerWhoJustPlayed == this.state.playerOneXO){
                    setTimeout(()=>{this.CPU()}, 500);// Thinking time
                }
            }
            else{
                this.updateScore();
                setTimeout(this.setupBoard, 2500);
                setTimeout(()=>{
                    this.setState({ message: { visibility: false}});
                    document.getElementById("playerHighlighter").style.display = "block";
                }, 2000) //
                if (this.state.oneP && this.state.currentPlayer == this.state.playerTwoXO){
                    setTimeout(this.CPU, 3000);//Thinking time
                }
            }
        }
    }
    gameOver = (n, occupiedCount) => {
        const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
        if(occupiedCount <= 9){
            for (var j=0; j<8; j++){
                if(winCombos[j].indexOf(n+1) != -1) {
                    var a = this.state.board[winCombos[j][0]-1];
                    var b = this.state.board[winCombos[j][1]-1];
                    var c = this.state.board[winCombos[j][2]-1];
                    if(a == this.state.currentPlayer && b == this.state.currentPlayer && c == this.state.currentPlayer){
                        document.getElementById("playerHighlighter").style.display = "none";
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
                        else if (this.state.oneP) {
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
        if(occupiedCount == 9){
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
            P1 = "Player " + this.state.playerOneXO;
            P2 = "Player " + this.state.playerTwoXO;
        }
        // $("#score").html('<b>'+P1+': '+pOneWins+'<span style="display:inline-block; width: 20px;"></span>'+P2+': '+pTwoWins+'</b><button id="resetBtn" onclick="reset()"><i class="fa fa-undo" aria-hidden="true"> Reset</i></button>'); TODO
    }
    minimax = (newBoard, player) => {
        this.state.fc++;
        var availSpots = this.emptyIndexies(newBoard);
        if (this.winning(newBoard, this.state.playerOneXO)){
            return {score:-10};
        }
        else if (this.winning(newBoard, this.state.playerTwoXO)){
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
    keypadHandler = (e) => {
        var key = e.keyCode;
        var decode = {49:7, 50:8, 51:9,52:4, 53:5, 54:6, 55:1, 56:2, 57:3};
        if (key>=49 && key <= 57 && this.state.gameStarted){
            this.game(decode[key]-1);
        }
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
                            <h4 id="score">
                                <b>Player {this.state.playerOneXO}:</b> {this.state.pOneWins}
                                    <span style={{display:"inline-block", width: "20px"}}></span>
                                <b>Player {this.state.playerTwoXO}:</b> {this.state.pTwoWins}
                                <button id="resetBtn" onClick={this.reset}><i className="fa fa-undo" aria-hidden="true"> Reset</i></button>
                            </h4>
                            <TicTacToeTable game={this.game} board={this.state.board}/>
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
