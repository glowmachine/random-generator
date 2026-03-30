import { save, loadSettings, saveSettings } from './save.js';

class RandomNumberGenerator {
    constructor() {
        this.element = document.querySelector('.random');
        this.roll(save.number.numberMin, save.number.numberMax);

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.roll(save.number.numberMin, save.number.numberMax);
            moveMenuIcon();
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
            moveMenuIcon();
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

function moveMenuIcon() {
    const settingsIcon = document.querySelector('.settings__link-icon');
    const settingsLink = document.querySelector('.settings__link');
    const positions = ['top', 'right', 'bottom', 'left', 'corner-tr', 'corner-br', 'corner-bl', 'corner-tl'];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];

    let style = "";
    //set alignment and rotation for top/bottom
    if (randomPosition === "top") {
        style += "top: -.25rem;";
        style += "transform: rotate(-45deg);"
    }
    else if (randomPosition === 'corner-tr' || randomPosition === 'corner-tl') {
        style += "top: -1px;";
    }
    else if (randomPosition === "bottom") {
        style += "bottom: -.25rem;"
        style += "transform: rotate(135deg);"
    }
    else if (randomPosition === 'corner-br' || randomPosition === 'corner-bl') {
        style += "bottom: -1px;";
    }

    //set alignment and rotation for right/left
    if (randomPosition === 'right') {
        style += "right: -.25rem;";
        style += "transform: rotate(45deg);"
    }
    if (randomPosition === 'corner-tr' || randomPosition === 'corner-br') {
        style += "right: -1px;";
    } else if (
        randomPosition === 'left') {
        style += "left: -.25rem;";
        style += "transform: rotate(-135deg);"
    } else if (randomPosition === 'corner-tl' || randomPosition === 'corner-bl') {
        style += "left: -1px;";
    }

    //set rotation for corners, alignment previously set by top/bottom and right/left
    if (randomPosition === 'corner-tr') {
        style += "transform: rotate(0deg);"
    }
    else if (randomPosition === 'corner-br') {
        style += "transform: rotate(90deg);"
    }
    else if (randomPosition === 'corner-bl') {
        style += "transform: rotate(180deg);"
    }
    else if (randomPosition === 'corner-tl') {
        style += "transform: rotate(-90deg);"
    }

    if (!randomPosition.includes('corner')) {
        if (randomPosition === 'top' || randomPosition === 'bottom') {
            //offset due to icon dimensions
            const randomX = Math.floor(Math.random() * (85 + 1));
            style += `right: ${randomX}%;`

        } else if (randomPosition === 'left' || randomPosition === 'right') {
            const randomY = Math.floor(Math.random() * (90 + 1));
            style += `top: ${randomY}%;`
        }
    }
    settingsLink.style.cssText = style;
}

function init() {
    document.addEventListener('DOMContentLoaded', (e) => {
        loadSettings();
        const path = window.location.pathname.split('/');
        const currentPage = path[path.length - 1];

        if (currentPage === '' || currentPage === 'index.html') {
            window.location.replace(`./${save.lastVisited}.html`);
        }
        else {
            moveMenuIcon();
            if (currentPage === 'number.html') {
                const randomNumberGenerator = new RandomNumberGenerator();
            }
            else if (currentPage === 'food.html') {
                const randomFoodGenerator = new RandomFoodGenerator();
            }
        }
    })
}

init();