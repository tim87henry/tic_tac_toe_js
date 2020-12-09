var gameBoard=document.querySelector("#gameboard");
let gameSquare=[];
let gameActive=false;
let currentUser;
let user1;
let user2;
let p1_ai=false;
let p2_ai=false;

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

const User = (num,name,isAI) => {
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

    const makeMove = () => {
        if (isAI && gameActive) {
            console.log("AI taking over")
            let values=[];
            for (i=0;i<9;i++) {
                values[i]=document.querySelector("#square"+i).innerHTML;
            }
            randomSquare=Math.floor(Math.random()*9)
            while (values[randomSquare]!='') {
                randomSquare=Math.floor(Math.random()*9)
            }
            console.log("AI brain says "+randomSquare+" for player "+num)
            drawMark("square"+randomSquare);
            if (currentUser.isGameOver()==true) {
                result.innerHTML=currentUser.name+" won";
                gameActive=false;
            } else if (currentUser.isGameTie()==true) {
                result.innerHTML="Tie Game";
                gameActive=false;
            }
            currentUser = (currentUser===user1)? user2 : user1;
            currentUser.makeMove();
        } else {
            gameBoard.addEventListener("click",function(e) {
            console.log("onclick board")
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
                    currentUser.makeMove();
                }
            }
            })
        }
    }

    return {drawMark, name, isAI, isGameOver, isGameTie, makeMove};
};

const gamePlay = (() => {
    let ai_button_bg="lightseagreen";
    let ai_button_bg_clicked="red";
    var result=document.querySelector("#result");
    var startGame=document.querySelector("#start");
    var ai1=document.querySelector("#ai1");
    var ai2=document.querySelector("#ai2");
    ai1.addEventListener("click",function(e) {
        p1_ai = (p1_ai===false)? true: false;
        ai1.style.background = (p1_ai===false)? ai_button_bg:ai_button_bg_clicked;
    });
    ai2.addEventListener("click",function(e) {
        p2_ai = (p2_ai===false)? true: false;
        ai2.style.background = (p2_ai===false)? ai_button_bg:ai_button_bg_clicked;
    });
    startGame.addEventListener("click",function(e) {
        Board.display();
        let player1= (p1_ai)? "AI Player 1":document.getElementById("player1").value;
        let player2= (p2_ai)? "AI Player 2":document.getElementById("player2").value;
        user1=User(1,player1,p1_ai);
        user2=User(2,player2,p2_ai);
        currentUser=user1;
        gameActive=true;
        currentUser.makeMove();
    });
})();


Board.display();