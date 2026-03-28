import { save, loadSettings } from './save.js';

class RandomNumberGenerator {
    constructor() {
        loadSettings();
        this.element = document.querySelector('.random');
        this.roll(save.number.numberMin, save.number.numberMax);

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.roll(save.number.numberMin, save.number.numberMax);
        });
    }

    roll(low, high) {
        this.element.textContent = save.number.numberInc ?
            Math.floor(Math.random() * (high - low + 1)) + low :
            Math.floor(Math.random() * (high - low - 1)) + (low + 1);
    }
}

function init() {
    document.addEventListener('DOMContentLoaded', (e) => {
        loadSettings();
        const location = window.location.pathname;

        if (location === '/' || location === '/index.html') {
            window.location.replace(`${save.lastVisited}.html`);
        }
        else {
            const randomNumberGenerator = new RandomNumberGenerator();
        }
    })
}

init();