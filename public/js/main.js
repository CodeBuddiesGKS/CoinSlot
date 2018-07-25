import Game from './Game.js';

const canvas = document.getElementById("coinSlot");

async function main(canvas) {
    const game = new Game();
    await game.init(canvas);
    game.start();
}

main(canvas);