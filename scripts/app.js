import { save, loadSettings } from './save.js';

class RandomNumberGenerator {
    constructor() {
        loadSettings();
        this.element = document.querySelector('.random');
        this.roll(save.number.min, save.number.max);

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.roll(save.number.min, save.number.max);
        });
    }

    roll(min, max) {
        this.element.textContent = save.number.inclusive ?
            Math.floor(Math.random() * (max - min + 1)) + min :
            Math.floor(Math.random() * (max - min - 1)) + (min + 1);
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