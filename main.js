// Inital Data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let warning = '';
let playing = true;
let placarX = 0;
let placarO = 0;

// Events

document.querySelector('.reset').addEventListener('click',reset);

document.querySelector('.continue').addEventListener('click',continueGame);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions 

function itemClick(event){
    let itemClidado = event.target.getAttribute('data-item')
    if(playing && square[itemClidado] == '' ){
        square[itemClidado] = playerTurn;
        renderSquare();
        togglePlayer();
    }
};

function newGame() {
    let random = Math.floor(Math.random() * 2);
    playerTurn = random === 0 ? "x" : "o";
};

function reset() {
    warning = '';

    newGame();

    for (let i in square) {
        square[i] = "";
        document.querySelector(`.${i}`).style.background = "cadetblue";
    }

    playing = true;

    placarX = 0;
    placarO = 0;

    renderSquare();
    renderInfo();
};

function continueGame() {
    warning = '';

    newGame();

    for (let i in square) {
       square[i] = "";
       document.querySelector(`.${i}`).style.background = "cadetblue";
    }

    playing = true;

    renderSquare();
    renderInfo();
};

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item="${i}"]`)
        item.innerHTML = square[i];
    }
    checkGame();
};

function renderInfo() {
    document.querySelector('.jogada').innerHTML = playerTurn;
    document.querySelector('.aviso').innerHTML = warning;
    document.querySelector(".scoreX").innerHTML = placarX;
    document.querySelector(".scoreO").innerHTML = placarO;
    if (playing) {
       document.querySelector(".vez").style.display = "block";
    } else {
        document.querySelector(".vez").style.display = "none";
    }
    if(warning === ""){
        document.querySelector(".aviso").style.display = "none";
    } else {
        document.querySelector(".aviso").style.display = "block";
    }

};

function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x'
    renderInfo();
};

function checkGame() {
    if(checkWinnerFor("x")){
        warning = 'Vitoria do x'
        playing = false
        placarX += 1;
    } else if (checkWinnerFor('o')){
        warning = 'Vitoria do o'
        playing = false
        placarO += 1;
    } else if (isFull()){
        warning = 'Empate!'
        playing = false
    };
};

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let i in pos){
        let pArray = pos[i].split(",");
        let hasWon = pArray.every(option => square[option] == player)
        if(hasWon) {
            pArray.forEach(item => document.querySelector(`.${item}`).style.background = "green");
            return true;
        }
    } 
     return false;
};

function isFull() {
    for(let i in square){
        if (square[i] == ''){
            return false;
        }
    }
    return true;
};

