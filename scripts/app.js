import { save, loadSettings, saveSettings } from './save.js';

class RandomNumberGenerator {
    constructor() {
        this.element = document.querySelector('.random');
        this.roll(save.number.numberMin, save.number.numberMax);

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.roll(save.number.numberMin, save.number.numberMax);
            alternateIcon();
        });
    }

    roll(low, high) {
        let result =
            this.element.textContent = save.number.numberInc ?
                Math.floor(Math.random() * (high - low + 1)) + low :
                Math.floor(Math.random() * (high - low - 1)) + (low + 1);
        this.addToHistory(result);
        this.incrementCounter();
        saveSettings();
    }

    addToHistory(result) {
        save.number.numberHistory.push(Number(result));
        save.number.numberHistory = save.number.numberHistory.slice(-10);
    }

    incrementCounter() {
        save.number.numberCounter++;
    }
}

function alternateIcon() {
    const configIcon = document.querySelector('.config__icon');
    if (configIcon.classList.contains('config__icon--alt'))
        configIcon.classList.remove('config__icon--alt');
    else
        configIcon.classList.add('config__icon--alt');


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