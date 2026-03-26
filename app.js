class RandomApp {
    constructor() {
        this.element = document.querySelector('.random');
        // this.value = this.element.innText;

        this.element.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if (this.min < this.max) {
                this.roll(this.min, this.max);
            }
            else {
                this.element.textContent = '?';
            }
        });

        //initial roll on page open
        this.roll();
        this.rangeListener();
    }

    roll(min = 1, max = 10) {
        this.element.textContent =
            Math.floor(Math.random() * (max - min + 1) + min);
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
}

const randomApp = new RandomApp();