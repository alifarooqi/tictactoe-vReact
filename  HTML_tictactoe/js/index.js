var oneP = true;
var winner = "Player 1";
var difficulty = 0;
var playerOneXO = 'X';
var playerTwoXO = 'O';
var pOneWins = 0;
var pTwoWins = 0;
var firstTurn = 1;
var currentPlayer = 'X';
var occupiedCount = 0;
var gameStarted = false;
var winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
var fc = 0;

$(document).ready(function main(){
  var ww = $('body').width();
  if (ww<800){
    document.body.scrollLeft = (800-ww)/2;
  }
  msgScreen('players');
  setTimeout(setupBoard, 0);
  document.onkeypress = function(e){
    var key = e.keyCode;
    var decode = {49:7, 50:8, 51:9,52:4, 53:5, 54:6, 55:1, 56:2, 57:3};
    if (key>=49 && key <= 57 && gameStarted){
      game(decode[key]);
    }
};
});

// Partially done
function reset(){
  pOneWins = 0;
  pTwoWins = 0;
  occupiedCount = 0;
  msgScreen('players');
  setTimeout(setupBoard, 0);
  $("#playerHighlighter").fadeOut();
  gameStarted = false;
}

function msgScreen(display) {
   if(display == "winner") {
    $("#msgTitle").html("Congragulations!!!");
    if(oneP){
      $("#msgRest").html("<h3>You've won the game!</h3>");
    }
    else {
      $("#msgRest").html("<h3>" + winner + " has won the game!</h3>");
    }
  }
  else if(display == "draw") {
    $("#msgTitle").html("Its a draw.");
    $("#msgRest").html("<h3>Better luck next time</h3>");
  }
  else if(display == "lost") {
    $("#msgTitle").html("Uh oh!");
    $("#msgRest").html("<h3>You've lost!</h3>");
  }
  $("#dimmer").fadeIn("slow");
}
var setupBoard = function setBoard(){
  for(var i=1; i<10; i++){
    $("#"+i).html("");
    $("#"+i).css("background", "");
  }
  occupiedCount = 0;
}

function game(n){
  if($("#"+n).html() == ""){
    $("#"+n).html(currentPlayer);
    occupiedCount++;
    if(!gameOver(n, occupiedCount)){
      if(currentPlayer == playerOneXO){
        currentPlayer = playerTwoXO;
        $("#playerHighlighter").animate({left: "310px"});
      }
      else {
        currentPlayer = playerOneXO;
        $("#playerHighlighter").animate({left: "210px"});
      }
      if (oneP && currentPlayer == playerTwoXO){
        setTimeout(CPU, 500);//Thinking time
      }
    }
    else{
      updateScore();
      setTimeout(setupBoard, 2500);
      setTimeout(function(){$("#dimmer").fadeOut("fast");}, 2000);
      if (oneP && currentPlayer == playerTwoXO){
        setTimeout(CPU, 3000);//Thinking time
      }
    }
  }
}
function gameOver(n, occupiedCount){
  if(occupiedCount <= 9){
    for (var j=0; j<8; j++){
      if(winCombos[j].indexOf(n) != -1) {
        var a = $("#"+winCombos[j][0]).html();
        var b = $("#"+winCombos[j][1]).html();
        var c = $("#"+winCombos[j][2]).html();
        if(a == currentPlayer && b == currentPlayer && c == currentPlayer){
          $("#"+winCombos[j][0]).css("background", "white");
          $("#"+winCombos[j][1]).css("background", "white");
          $("#"+winCombos[j][2]).css("background", "white");
          if (oneP && currentPlayer == playerOneXO){
            msgScreen('winner');
            pOneWins++;
          }
          else if (oneP) {
            msgScreen('lost');
            pTwoWins++;
          }
          else if (currentPlayer == playerOneXO){
            winner = "Player 1";
            pOneWins++;
            msgScreen('winner');
          }
          else{
            winner = "Player 2";
            pTwoWins++;
            msgScreen('winner');
          }
          return true;
        }
      }
    }
  }
  if(occupiedCount == 9){
    msgScreen('draw');
    return true;
  }
  else{
    return false;
  }
}

function updateScore(){
  var P1 = "Player";
  var P2 = "CPU";
  if(!oneP){
    P1 = "Player " + playerOneXO;
    P2 = "Player " + playerTwoXO;
  }
  $("#score").html('<b>'+P1+': '+pOneWins+'<span style="display:inline-block; width: 20px;"></span>'+P2+': '+pTwoWins+'</b><button id="resetBtn" onclick="reset()"><i class="fa fa-undo" aria-hidden="true"> Reset</i></button>');
}
function minimax(newBoard, player){
  fc++;
  var availSpots = emptyIndexies(newBoard);
  if (winning(newBoard, playerOneXO)){
     return {score:-10};
  }
	else if (winning(newBoard, playerTwoXO)){
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
    if (player == playerTwoXO){
      var result = minimax(newBoard, playerOneXO);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, playerTwoXO);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if(player === playerTwoXO){
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
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}
function winning(board, player){
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