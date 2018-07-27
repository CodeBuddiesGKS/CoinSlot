import Camera from "./Camera.js";
import Entity from './Entity.js';
import Gamepad from './Gamepad.js';
import Keyboard from './Keyboard.js';
import PlayState from './traits/PlayState.js';
import Timer from './Timer.js';
import {loadEntityFactory} from './entities.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {loadFont} from './loaders/font.js';
import {createLevelFactory} from './loaders/level.js';
import * as tools from './tools.js';

export default class Game {
    constructor() {
        this.camera = new Camera();
        this.controller = new Gamepad();
        this.currPlayer = null;
        this.keyboard = new Keyboard();
        this.level = null;
        this.players = [];
        this.timer = new Timer(1/60);
    }
    async init(canvas, isTwoPlayers = false) {    
        const [entityFactory, font] = await Promise.all([
            loadEntityFactory(),
            loadFont()
        ]);

        const mario = entityFactory.avatar();
        this.players.push(new Entity());
        this.players[0].addTrait(new PlayState(mario, this.camera));
        this.players[0].PlayState.checkpoint.set(32, 160);
        this.currPlayer = this.players[0];
        this.keyboard.bindControls(this.currPlayer.PlayState.avatar);

        if (isTwoPlayers) {
            const luigi = entityFactory.avatar();
            luigi.Shift.color = 'wyg';
            this.players.push(new Entity());
            this.players[1].addTrait(new PlayState(luigi, this.camera));
            this.players[1].PlayState.checkpoint.set(32, 160);
        }

        const dashboardLayer = createDashboardLayer(font, this.currPlayer);
    
        const levelFactory = createLevelFactory(entityFactory);
        this.level = await levelFactory('1-1');
        this.level.comp.layers.set('dashboardLayer', dashboardLayer);
        this.level.entities.add(this.players[0]);
    
        //// Tools
        // tools.enableMouseControl(canvas, this.camera, this.level, this.currPlayer.PlayState.avatar);
        // tools.showCameraBox(this.level, this.camera);
        // tools.showTileCollision(this.level);
        // tools.showBoundingBox(this.level);
    
        this.timer.update = (deltaTime) => {
            this.controller.checkActivity(this.currPlayer.PlayState.avatar);
            this.level.update(deltaTime);
            this.level.comp.draw(canvas.getContext("2d"), this.camera);
        };
    }
    start() {
        this.timer.start();
    }
}