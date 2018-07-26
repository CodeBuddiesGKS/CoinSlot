import {Trait} from '../Entity.js';

export default class Shift extends Trait {
    constructor() {
        super('Shift');
        this.size = 'sm';
        this.color = 'ryg';
    }
}