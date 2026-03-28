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
        const result = save.food[randomFood].label;
        this.element.textContent = result;
        this.addToHistory(result);
        this.incrementCounter();
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

    addToHistory(result) {
        save.food.foodHistory.push(result);
        save.food.foodHistory = save.food.foodHistory.slice(-10);
    }

    incrementCounter() {
        save.food.foodCounter++;
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
        const path = window.location.pathname.split('/');
        const currentPage = path[path.length - 1];

        if (currentPage === '' || currentPage === 'index.html') {
            window.location.replace(`./${save.lastVisited}.html`);
        }
        else if (currentPage === 'number.html') {
            const randomNumberGenerator = new RandomNumberGenerator();
        }
        else if (currentPage === 'food.html') {
            const randomFoodGenerator = new RandomFoodGenerator();
        }
    })
}

init();