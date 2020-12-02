var gameBoard=document.querySelector("#gameboard");
let gameSquare=[];
let gameActive=false;

const Board = (() => {
    const display = () => {
        gameBoard.innerHTML="";
        for (i=0;i<9;i++) {
            gameSquare[i]=document.createElement("div");
            gameSquare[i].className="gameSquare";
            gameSquare[i].id="square"+i;
            gameBoard.appendChild(gameSquare[i]);
        }
    };
    return {display};
})();

const User = (num,name) => {
    let mark = (num===1)? "X" : "O"; 
    
    const drawMark = (squareId) => {
        document.querySelector("#"+squareId).innerHTML=mark;
    }

    const isGameOver = () => {
        let values=[];
        for (i=0;i<9;i++) {
            values[i]=document.querySelector("#square"+i).innerHTML;
        }
        if ((values[0]===mark && values[1]===mark && values[2]===mark)
         || (values[0]===mark && values[3]===mark && values[6]===mark)
         || (values[0]===mark && values[4]===mark && values[8]===mark)
         || (values[3]===mark && values[4]===mark && values[5]===mark)
         || (values[6]===mark && values[7]===mark && values[8]===mark)
         || (values[1]===mark && values[4]===mark && values[7]===mark)
         || (values[2]===mark && values[5]===mark && values[8]===mark)
         || (values[2]===mark && values[4]===mark && values[6]===mark)) {
            return true;
        }
        return false;
    }

    const isGameTie = () => {
        let values=[];
        for (i=0;i<9;i++) {
            values[i]=document.querySelector("#square"+i).innerHTML;
        }
        const isNotEmpty = (val) => val!="";
        if (values.every(isNotEmpty)) {
            return true;
        }
        return false;
    }

    return {drawMark, name, isGameOver, isGameTie};
};

const gamePlay = (() => {
    let currentUser;
    let user1;
    let user2;
    var result=document.querySelector("#result");
    var startGame=document.querySelector("#start");
    startGame.addEventListener("click",function(e) {
        Board.display();
        let player1=document.getElementById("player1").value;
        let player2=document.getElementById("player2").value;
        user1=User(1,player1);
        user2=User(2,player2);
        currentUser=user1;
        gameActive=true;
    });
    gameBoard.addEventListener("click",function(e) {
        if (gameActive) {
            let squareId=e.target.id;
            if (document.querySelector("#"+squareId).innerHTML!="X" && document.querySelector("#"+squareId).innerHTML!="O") {
                currentUser.drawMark(squareId);
                if (currentUser.isGameOver()==true) {
                    result.innerHTML=currentUser.name+" won";
                    gameActive=false;
                } else if (currentUser.isGameTie()==true) {
                    result.innerHTML="Tie Game";
                    gameActive=false;
                }
                currentUser = (currentUser===user1)? user2 : user1;
            }
        }
    })
})();


Board.display();