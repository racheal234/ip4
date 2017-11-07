//back-end logic
function Player(Name, turnAmmount, totalAmmount) {
    this.Name = Name;
    this.turnAmmount = turnAmmount;
    this.totalAmmount = totalAmmount;
}

Player.prototype.roll = function () {
    var ranPigAmmount = (Math.floor(Math.random() * 6) + 1);
    //    console.log(dieRanVal)
    if (ranPigAmmount === 1) {
        this.turnAmmount = 0;
        // alert("Ooops! You rolled a 1. It's  " + this.Name +"'s turn");
        dieRanVal= 0;
    } else {
        this.turnAmmount = this.turnAmmount + ranPigAmmount;
        //        console.log(this.turnScore)
    }
    return ranPigAmmount;
}

Player.prototype.ammount = function () {
    this.totalAmmount += this.turnAmmount
    this.turnAmmount = 0

    if(this.totalAmmount >= 100){
        alert("GAme Over");
    }else{
        alert("your turn is over");
    }
}

function Clearfield() {
    $("#player1").val("");
    $("#player2").val("");
}
