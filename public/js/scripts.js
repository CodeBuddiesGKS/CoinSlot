

const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");

context.fillRect(0, 0, canvas.width, canvas.height);

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
};

for (let y = 13; y < 15; ++y) {
    for (let x = 0; x < 16; ++x) {
        loadImage('img/tiles.png').then(image => {
            context.drawImage(image, 0, 0, 16, 16, x*16, y*16, 16, 16);
        });
    }
}