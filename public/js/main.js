function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
};

// function loadJSON(path, callback) {
//     let xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', path, true);
//     xobj.onreadystatechange = () => {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             callback(xobj.response);
//         }
//     }
//     xobj.send(null);
// }

// function loadLevel(name, callback) {
//     loadJSON(`../levels/${name}.json`, callback);
//     callback();
//     //return fetch(`../levels/${name}.json`).then(r => r.json());
// }
 
const canvas = document.getElementById("coinSlot");
const context = canvas.getContext("2d");
context.fillRect(0, 0, canvas.width, canvas.height);

loadImage('img/tiles.png').then(image => {
    const sprites16 = new SpriteSheet(image, 16, 16);
    
    sprites16.define('ground', 0, 0);
    sprites16.define('sky', 3, 23);

    // loadLevel('1-1', (level) => {
    //     console.log(level);
    // });
    // loadLevel('1-1').then(level => {
    //     console.log(level);
    // });

    for (let x = 0; x < 16; ++x) {
        for (let y = 0; y < 15; ++y) {
            if (y < 13) {
                sprites16.drawTile('sky', context, x, y);
            } else {
                sprites16.drawTile('ground', context, x, y);
            }
        }
    }

    const sprites32 = new SpriteSheet(image, 32, 32);
    sprites32.define('tunnel', 0, 5);
    sprites32.draw('tunnel', context, 64, 176);
});