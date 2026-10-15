const resetBtn = document.querySelector("#resetBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const boxes = document.querySelectorAll(".boxes");
const scoreX = document.querySelector("#X");
const scoreO = document.querySelector("#O");
const statusText = document.querySelector("#statusText");
const winCase = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const storeData = "points";
let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let gameOver = false;
let scores = loadScore();

function loadScore() {
  const savedScores = localStorage.getItem(storeData);
  if (savedScores === null) {
    return { X: 0, O: 0 };
  }
  return JSON.parse(savedScores);
}

function saveScore() {
  localStorage.setItem(storeData, JSON.stringify(scores));
}
function updateScoreboard() {
  scoreX.innerText = `X : ${scores.X}`;
  scoreO.innerText = `O : ${scores.O}`;
}
function updateStatus() {
  if (gameOver) {
    return;
  }
  statusText.innerText = `${player}'s turn`;
}
function winnerCheck() {
  for (const cases of winCase) {
    const [a, b, c] = cases;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) 
    {
      return board[a];
    }
  }
  return null;
}


function switchPlayer(){
    player= player=== "X" ? "O":"X";
    updateStatus();
}

function boxClick(event) {
    const box=event.target;
    const index= Number(box.id)
    if(board[index]!=="" || gameOver){
        return
    }
    board[index] = player;
    box.innerText=player;

    const winner = winnerCheck();

    if(winner!==null){
        gameOver=true;
        statusText.innerText=`${player} Wins`
        scores[winner]++;        
        updateScoreboard();
        saveScore();
        return
    }
    if(board.every((eachBox)=>eachBox!=="")){
        gameOver=true;
        statusText.innerText=`DRAW`
        return;
    }
    switchPlayer()
}

const  resetGame=()=>{
    board = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    gameOver = false;

    boxes.forEach((eachBox)=>{
        eachBox.innerText="";
    });
    updateStatus()
}

const deleteGame=()=>{
    resetGame();
    scores={X:0,O:0};
    localStorage.removeItem(storeData)
    updateScoreboard()
}

boxes.forEach((box)=>{
    box.addEventListener('click', boxClick)
});
updateScoreboard();
updateStatus();