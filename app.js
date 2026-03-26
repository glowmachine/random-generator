class RandomApp {

    constructor() {
        this.element = document.querySelector('.random');
        this.historyElement = document.querySelector('.history__list');
        this.historyList = [];

        this.rangeListener();
        //initial roll on page open
        this.roll();

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if (this.min < this.max) {
                this.roll(this.min, this.max);
            }
            else {
                this.element.textContent = '?';
            }
        });
    }

    roll(min = 1, max = 10) {
        this.element.textContent =
            Math.floor(Math.random() * (max - min + 1) + min);
        this.addToHistory(this.element.textContent);
        this.renderHistory();
    }

    rangeListener() {
        const min = document.querySelector('.range__min');
        const max = document.querySelector('.range__max');

        this.min = Number(min.value);
        this.max = Number(max.value);

        min.addEventListener('input', (e) => {
            this.min = Number(min.value);
        });
        max.addEventListener('input', (e) => {
            this.max = Number(max.value);
        });
    }

    addToHistory(newValue) {
        this.historyList = [...this.historyList.slice(-4), newValue];
    }

    renderHistory() {
        this.historyElement.innerHTML = '';
        this.historyList.forEach((item) => {
            const newItem = document.createElement('li');
            newItem.textContent = item;
            this.historyElement.appendChild(newItem);
        });
    }
}

const randomApp = new RandomApp();