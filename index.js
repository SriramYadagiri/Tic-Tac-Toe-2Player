var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var result = document.getElementById('result').innerHTML;

w = 200;
h = 200;

var available = 9;

var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

var players = ['X', 'O'];

var currentPlayer;

if(Math.random()<0.5){
    currentPlayer = players[0];
} else{
    currentPlayer = players[1];
}

document.onclick = (evt) => {
    for(var col = 0; col<3; col++){
        for(var row = 0; row<3; row++){
            var letter = board[col][row];

            var x = row*w;
            var y = col*w;

            if(evt.offsetX>x && evt.offsetY>y
               && evt.offsetX<x+w && evt.offsetY<y+h){
                if(letter==''){
                    board[col][row] = currentPlayer;
                    available--;
                    if(checkWinner()){
                        document.getElementById('result').innerHTML=checkWinner();
                    }
                    currentPlayer=='O'?currentPlayer='X':currentPlayer='O';
                }
            }
        }
    }
}

draw();

function draw(){
    requestAnimationFrame(draw)
    rect(0, 0, canvas.width, canvas.height, "rgb(100, 100, 100)");

    drawBoard();
}

function equals3(a, b, c){
    return (a==b && b==c && a!='');
}

function checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    if (winner == null && available == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }

function drawBoard(){
    line(w, 0, w, canvas.height);
    line(w*2, 0, w*2, canvas.height);
    line(0, h, canvas.width, h);
    line(0, h*2, canvas.width, h*2);

    for(var col = 0; col<3; col++){
        for(var row = 0; row<3; row++){
            var letter = board[col][row];

            var x = row*w;
            var y = col*w;

            if(letter == 'X'){
                line(x+20, y+20, x+w-20, y+h-20);
                line(x+w-20, y+20, x+20, y+h-20);
            } else if(letter == 'O'){
                ellipse(x+w/2, y+h/2, 85);
            }
        }
    }
}

function rect(x, y, width, height, color="black"){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function line(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function ellipse(x, y, radius){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.stroke();
}