let drawNumbers;
let drawNumbersBucket;
let pickedNumbers;
let gameNumbers;
let gameSize;
let gameNumberOfRows;
let gameNumberOfColumns;
let gameMaximumNumberOfPicks;
let bankroll;
let betSize;
let minimumPayout;

const runDraw = () => {

};

function initializeGameNumbers() {
    gameSize = gameNumberOfRows * gameNumberOfColumns;
    gameNumbers = Array(gameSize, (_, i: number) => i + 1 );
    drawNumbersBucket = Array(gameSize, (_, i: number) => i + 1 );
    gameNumbers.forEach(element => {
        element = {
            marked: false,
            hit: false,
        };        
    });
}

function getDrawNumbers() {

}

function generateDraw() {    
    for(let i = 0; i < gameNumbers.length; i++) {
        const r = Math.floor(Math.random()*i);
    }
}
