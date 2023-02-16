const intro = document.querySelector(".intro");
const game = document.querySelector('.game');
const finish = document.querySelector('.finish');
const gridItem = document.querySelectorAll('.grid-item');
const desk = document.querySelector('.desk');
const p = document.querySelector('#p');
const takes = document.querySelector('.takes');
const finishNext = document.querySelector('#finish-next');
const finishTakes = document.querySelector('#finish-takes');
const outputX = document.querySelector('#output-x');
const outputNumberX = document.querySelector('#output-number-x');
const outputNumberDraw = document.querySelector('#output-number-draw');
const outputO = document.querySelector('#output-o');
const outputNumberO = document.querySelector('#output-number-o');


let outputNumberx = 0;
let outputNumberdraw = 0;
let outputNumbero = 0;

outputNumberX.innerHTML = outputNumberx;
outputNumberDraw.innerHTML =  outputNumberdraw;
outputNumberO.innerHTML =  outputNumbero;

let turnCounter = 0;
let chooseside = null;
let winner = false;


const checkForWin = () => {
    const winningCombinations = [    
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if(
        gridItem[a].innerHTML === gridItem[b].innerHTML &&
        gridItem[a].innerHTML === gridItem[c].innerHTML &&
        gridItem[a].innerHTML !== "") 

        {

        finish.style.display = "flex";
        game.style.opacity = "0.8";
        finishNext.innerHTML = "NEXT ROUND";
        finishQuit.innerHTML = "QUIT";
        
        const finishX = document.querySelector("#finish-x");
        const finishO = document.querySelector("#finish-o");

        winner = true;
        turnCounter = 0;

        let image = gridItem[a].querySelector("img");
            if(image.src.includes("/img/icon-x.svg")){
                
                finishX.style.display = 'block';
                finishO.style.display = 'none';
                finishTakes.style.color = "#31C3BD";
                outputNumberx ++;
                outputNumberX.innerHTML = outputNumberx;    
                    switch(chooseside){
                        case 'O':
                            p.innerHTML = "OH NO, YOU LOST...";
                            break;
                        default: 
                            p.innerHTML =  "YOU WON!";
                            break;
                    }
            } else if (image.src.includes("/img/icon-o.svg")){
                takes.style.display = 'flex'
                finishO.style.display = 'block';
                finishX.style.display = 'none';
                finishTakes.style.color = "#F2B137";
                outputNumbero++;
                outputNumberO.innerHTML = outputNumbero;
                switch(chooseside){
                    case 'X':
                        p.innerHTML = "OH NO, YOU LOST...";
                        break;
                    default: 
                        p.innerHTML =  "YOU WON!";
                        break;
                } 
            }      
        }
    }
    if(winner !== true && isDeskFull()){
        game.style.opacity = "0.8";
        finish.style.display = "flex";
        p.innerHTML = "ROUND TIED";
        p.style.fontSize = "min(10vw, 55px)";
        takes.style.display = 'none';
        finishNext.innerHTML = "NEXT ROUND";
        finishQuit.innerHTML = "QUIT";
        outputNumberdraw ++;
        outputNumberDraw.innerHTML = outputNumberdraw; 
        turnCounter = 0
    }
    
    finishNext.addEventListener('click', nextRound);
    finishQuit.addEventListener('click', restart);
};




const cells = desk.children;
function isDeskFull() {
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].querySelector('img')) {
            return false;
        }
    }
    return true;
}


function nextRound(){
    finish.style.display = 'none';
    game.style.opacity = '1';
    takes.style.display = 'flex'
    p.style.fontSize = 'min(5vw, 25px)';
    winner = false;
    for(let i of gridItem){
        i.innerHTML = "";
    }
    if(chooseside == "O" && vsCPU == true){
        setTimeout(computerTurn, 300);
    }
    
}
  
  
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
function restartGame(){
    game.style.opacity = "0.8";
    finish.style.display = "flex";
    p.innerHTML = "RESTART GAME?";
    p.style.fontSize = "min(10vw, 55px)";
    takes.style.display = 'none';
    finishQuit.innerHTML = "NO, CANCEL";
    finishNext.innerHTML = "YES, RESTART";
    finishNext.addEventListener('click', restart);
}


const finishQuit = document.querySelector('#finish-quit');
finishQuit.addEventListener('click', cancel);
function cancel(){
    finish.style.display = 'none';
    game.style.opacity = '1';
}


function restart(){
    location.reload();
}

const X = document.querySelector("#X");
X.addEventListener('click', () =>{
    chooseside = "X";
    X.classList.add('active');
    O.classList.remove('active');
})


const O = document.querySelector("#O");
O.addEventListener('click', () =>{
    chooseside = "O";
    O.classList.add('active');
    X.classList.remove('active');
})




const newGameCPU = document.querySelector("#yellow");
newGameCPU.addEventListener('click', () =>{
    if(chooseside != null){
        intro.style.display = "none";
        game.style.display = "block";
        outputX.innerHTML = "X (YOU)";
        outputO.innerHTML = "O (CPU)";
            if(chooseside == "X"){
            
                desk.addEventListener('click', put());
                
            }else if(chooseside == "O"){
                
                setTimeout(computerTurn, 300);
                Xsvg.style.display = 'none';
                Osvg.style.display = 'inline-block';
                desk.addEventListener('click', put());
            }
    }
})



const newGamePlayer = document.querySelector("#cyan");
let vsCPU = true;
newGamePlayer.addEventListener('click', () =>{
    intro.style.display = "none";
    game.style.display = "block";
    outputX.innerHTML = "X (P1)";
    outputO.innerHTML = "O (P2)";
    vsCPU = false;
    desk.addEventListener('click', PVP());
})




for(let n of gridItem){
    n.addEventListener('mouseenter', () => {
        if(n.innerHTML == "" ){
        let hoverImg = document.createElement('img');
            if(chooseside == "O" && vsCPU == true || turnCounter % 2 == 1){
                
                hoverImg.setAttribute('src', "./img/icon-o-outline.svg");

            } else if (chooseside == "X" || turnCounter % 2 == 0){
                
                hoverImg.setAttribute('src', "./img/icon-x-outline.svg");
            }
            hoverImg.setAttribute('width', '60%');
            hoverImg.setAttribute('height', 'auto');
            hoverImg.id = "hoverImg";
            n.appendChild(hoverImg);
        }
    })
    n.addEventListener('mouseleave', () => {
        let hoverImg = n.querySelector('#hoverImg');
            if(hoverImg != null){
            n.removeChild(hoverImg);
            }
    })
}




function PVP(){
    for(let i = 0; i < gridItem.length; i++) {
        gridItem[i].addEventListener('click', function PVPXO(){
            const myImage = gridItem[i].querySelector("img");
            if(gridItem[i].innerHTML == "" || myImage.getAttribute("id") === "hoverImg"){
                let newImage = document.createElement("img");
                gridItem[i].removeChild(hoverImg);
                if(turnCounter % 2 == 0){
                    newImage.setAttribute("src","./img/icon-x.svg");
                } else {
                    newImage.setAttribute("src","./img/icon-o.svg");
                }
                newImage.setAttribute("width","60%");
                newImage.setAttribute("height", "auto");
                this.appendChild(newImage);
                turnCounter++;
                changeSvgPVP();
                checkForWin();
            }
        })
    }
}





function put(){   
    for (let i = 0; i < gridItem.length; i++) {
        gridItem[i].addEventListener("click", function putXO() {
            const myImage = gridItem[i].querySelector("img");
            if(gridItem[i].innerHTML == "" || myImage.getAttribute("id") === "hoverImg"){
                let newImg = document.createElement("img");
                let hoverImg = gridItem[i].querySelector('#hoverImg');
                gridItem[i].removeChild(hoverImg);
                if(chooseside == "X"){
                    newImg.setAttribute("src","./img/icon-x.svg");
                }else if(chooseside == "O"){
                    newImg.setAttribute("src","./img/icon-o.svg");
                } 
                newImg.setAttribute("width", "60%");
                newImg.setAttribute("height", "auto");
                this.appendChild(newImg);
                changeSvg();
                checkForWin();
                if(winner == false && !isDeskFull()){
                    setTimeout(computerTurn,200); 
                }
            }
        });
    }
}



function computerTurn(){   
    for (let i = 0; i < gridItem.length; i ++) {
        if (gridItem[i].innerHTML == "") {
            undoSvg();
            const img = document.createElement('img');
                if(chooseside == "X"){
                    img.src = './img/icon-o.svg';
                    gridItem[i].appendChild(img);
                    break;
                }else{
                    img.src = './img/icon-x.svg';
                    gridItem[i].appendChild(img);
                    break;
                }
        }
    }
    checkForWin();
};



const Xsvg = document.querySelector('#Xsvg');
const Osvg = document.querySelector('#Osvg');

function changeSvg(){
    if(chooseside == "X" || turnCounter % 2 == 1){
        Xsvg.style.display = 'none';
        Osvg.style.display = 'inline-block';
    } else {
        Osvg.style.display = 'none';
        Xsvg.style.display = 'inline-block';
    }
}

function changeSvgPVP(){
    if(turnCounter % 2 == 1){
        Xsvg.style.display = 'none';
        Osvg.style.display = 'inline-block';
    } else {
        Osvg.style.display = 'none';
        Xsvg.style.display = 'inline-block';
    }
}

function undoSvg(){
    if(chooseside == "X"){
        Osvg.style.display = 'none';
        Xsvg.style.display = 'inline-block';
    } else {
        Xsvg.style.display = 'none';
        Osvg.style.display = 'inline-block';
    }
}
