function player(Name,turn,total) {
  this.Name = Name;
  this.turn= turn;
  this.total=total;
}


Game.prototype.endGame = function() {
  this.gameOver = true;
  this.currentPlayer = 0;
  this.players=[];
}

Game.prototype.addPlayer=function(player) {
  this.players.push(player);
}

Game.prototype.startGame=function() {
  this.gameOver = false;
  this.currentPlayer = 0;
}

Game.prototype.endTurn = function() {
  this.players[this.currentPlayer].gameScore+=this.players[this.currentPlayer].turnScore;
  this.players[this.currentPlayer].turnScore = 0;
  if (this.currentPlayer<this.players.length-1) {
    this.currentPlayer++;
  } else {
    this.currentPlayer = 0;
  }
}

function Player(name) {
  this.name=name;
  this.gameScore=0;
  this.turnScore=0;
}

function Die(sides) {
  this.sides = sides;
  this.value = 1;
  this.roll();
}

Die.prototype.roll=function(){
    min = 1;
    max = this.sides;
    this.value = Math.floor(Math.random()*(max - min+1)) + min;
}

// UI logic
var newGame = new Game();

function endTurn() {
  newGame.endTurn();
}

function endGame() {
  if(newGame.players[newGame.currentPlayer].gameScore + newGame.players[newGame.currentPlayer].turnScore >= 100) {
    alert("GAME OVER: "+ newGame.players[newGame.currentPlayer].name +" won with a score of " + newGame.players[newGame.currentPlayer].gameScore + newGame.players[newGame.currentPlayer].turnScore + "!!");
  } else {
    alert("end game!");
  }
  newGame.endGame();
  $("#listPlayers").empty();
  $("#displayDie").html("<img src='img/roll.png' class='img-responsive'>");
  $("#currentScore").text("Current Player Name");
  $("#currentPlayer").text("Current Turn Score");
  $("#hold").prop("disabled", false);
  $("#roll").prop("disabled", false);
  $("#playGame").prop("disabled", false);
}

function showScores() {
  $("#listPlayerScores").empty();
  newGame.players.forEach(function(player){
    $("#listPlayerScores").append("<h3>"+player.name+": "+player.gameScore+"</h3>");
  });
}

function startTurn () {
  newGame.die.roll();
  if(newGame.die.value === 1) {
    newGame.players[newGame.currentPlayer].turnScore=0;
  } else {
    newGame.players[newGame.currentPlayer].turnScore+=newGame.die.value;
  }
  $("#displayDie").html("<img src='img/"+newGame.die.value+".jpg' class='img-responsive'>");
  $("#currentScore").text(newGame.players[newGame.currentPlayer].turnScore);
  $("#currentPlayer").text(newGame.players[newGame.currentPlayer].name + ": " + newGame.players[newGame.currentPlayer].gameScore);
  showScores();
  if(newGame.players[newGame.currentPlayer].turnScore===0) {
    setTimeout(function() {
      alert("Sorry, " + newGame.players[newGame.currentPlayer].name + " you rolled a 1. You get NOTHING!!");
    },500);

    endTurn();
    startTurn();
  }
  if (newGame.players[newGame.currentPlayer].gameScore + newGame.players[newGame.currentPlayer].turnScore >= 100) {
    setTimeout(endGame,500);
  }
}

$("#addPlayer").click(function() {
  var newPlayer = new Player($("#playerName").val());
  $("#listPlayers").append("<li>" + newPlayer.name + "</li>");
  newGame.addPlayer(newPlayer);
  $("#playerName").val("");
  if($("#playGame:disabled")) {
    $("#playGame").prop("disabled", false);
  }
});

$("#playGame").click(function(){
  if(!newGame.gameOver) {
    endGame();
  }
  newGame.startGame();
  $("#listPlayers").hide();
  if($("#roll:disabled")) {
    $("#roll").prop("disabled", false);
  }
  if($("#hold:disabled")) {
    $("#hold").prop("disabled", false);
  }
  showScores();
  startTurn();
});

$("#roll").click(function(){
  startTurn();
});

$("#hold").click(function(){
  endTurn();
  startTurn();
});
