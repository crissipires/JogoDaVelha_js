// Inital Data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let warning = '';
let playing = false;

// Events

document.querySelector('.reset').addEventListener('click',reset);

document.querySelector('.item').
// functions 

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'x' : '0';
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
}

function renderInfo() {
    document.querySelector('.jogada').innerHTML = playerTurn;
}