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

class RandomFoodGenerator {
    constructor() {
        this.element = document.querySelector('.random');
        this.foodList = this.filterFoods();
        this.roll(this.foodList);

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.roll(this.foodList);
            alternateIcon();
        });
    }

    roll(selectedFoods) {
        const randomFood = selectedFoods[Math.floor(Math.random() * selectedFoods.length)];
        //use the random key to select it from save.food and get its label
        this.element.textContent = save.food[randomFood].label;
        saveSettings();
    }

    filterFoods() {
        const selected = [];
        //for each key of save.food, add if it's checked
        Object.keys(save.food).forEach((option) => {
            if (save.food[option].checked)
                selected.push(option);
        });
        return selected;
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
            //if index.html, redirect to last saved random generator
            window.location.replace(`${save.lastVisited}.html`);
        }
        else if (location === '/number.html') {
            const randomNumberGenerator = new RandomNumberGenerator();
        }
        else if (location === '/food.html') {
            const randomFoodGenerator = new RandomFoodGenerator();
        }
    })
}

init();