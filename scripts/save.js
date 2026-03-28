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
    loadNumberSettings(data);
}

export function saveSettings() {
    localStorage.setItem('rngSettings', JSON.stringify(save));
}

function loadNumberSettings(data) {
    if (data) {
        save.lastVisited = data.lastVisited;
        save.number = data.number;
        save.food = data.food;
        return save;
    }
    else
        return null;
}