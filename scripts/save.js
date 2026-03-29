export let save = {
    //default values
    lastVisited: 'number',
    number: {
        numberMin: 1,
        numberMax: 10,
        numberInc: 1,
        numberHistory: [],
        numberCounter: 0,
    },
    food: {
        foodRice: { checked: true, label: '🍚' },
        foodSoup: { checked: true, label: '🍜' },
        foodSushi: { checked: true, label: '🍣' },
        foodPizza: { checked: true, label: '🍕' },
        foodBurger: { checked: true, label: '🍔' },
        foodBurrito: { checked: true, label: '🌯' },
        foodChicken: { checked: true, label: '🍗' },
        foodFish: { checked: true, label: '🐟' },
        foodHistory: [],
        foodCounter: 0,
    }
};

export function loadSettings() {
    const data = JSON.parse(localStorage.getItem('rngSettings'));
    if (data) {
        save.lastVisited = data.lastVisited;
        save.number = data.number;
        save.food = data.food;
    }
}

export function saveSettings() {
    localStorage.setItem('rngSettings', JSON.stringify(save));
}

export function resetSettings(category) {
    switch (category) {
        case 'number':
            save.number = {
                numberMin: 1,
                numberMax: 10,
                numberInc: 1,
                numberHistory: [],
                numberCounter: 0,
            }
            break;
        case 'food':
            save.food = {
                foodRice: { checked: true, label: '🍚' },
                foodSoup: { checked: true, label: '🍜' },
                foodSushi: { checked: true, label: '🍣' },
                foodPizza: { checked: true, label: '🍕' },
                foodBurger: { checked: true, label: '🍔' },
                foodBurrito: { checked: true, label: '🌯' },
                foodChicken: { checked: true, label: '🍗' },
                foodFish: { checked: true, label: '🐟' },
                foodHistory: [],
                foodCounter: 0,
            }
            break;
        default:
            console.log('Not an Option');
    }
    saveSettings();
    loadSettings();
}