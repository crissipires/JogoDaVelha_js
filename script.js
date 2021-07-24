// Inital Data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let warning = '';
let playing = true;

// Events

document.querySelector('.reset').addEventListener('click',reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})
// functions 
function itemClick(event){
    let itemClidado = event.target.getAttribute('data-item')
    if(playing && square[itemClidado] == '' ){
        square[itemClidado] = playerTurn;
        renderSquare();
        togglePlayer();
    }
}
function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'x' : 'o';
    console.log(playerTurn)

    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item="${i}"]`)
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.jogada').innerHTML = playerTurn;
    document.querySelector('.aviso').innerHTML = warning;

}

function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x'
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor("x")){
        warning = 'O x venceu!'
        playing = false
    } else if (checkWinnerFor('o')){
        warning = 'O o venceu!'
        playing = false
    } else if (isFull()){
        warning = 'O jogo empatou!'
        playing = false
    };
};

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c2',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let i in pos){
        let pArray = pos[i].split(",");
        let hasWOn = pArray.every(option => square[option] === player)
        if(hasWOn) {
            return true;
        }
    } 
     return false;
};

//verifica se tudo está preenchido
function isFull() {
    for(let i in square){
        if (square[i] == ''){
            return false;
        }
    }
    return true;
};