class RandomApp {
    constructor() {
        this.element = document.querySelector('.choice');
        this.value = this.element.textContent;

        this.element.addEventListener('click', (e) => {
            this.roll();
        });
    }

    roll(min = 0, max = 10) {
        this.element.textContent =
            Math.floor(Math.random() * 10 + 1);
    }
}

const randomApp = new RandomApp();