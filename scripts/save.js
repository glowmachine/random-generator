const defaultValues = {
    lastVisited: 'number',
    number: {
        numberMin: 1,
        numberMax: 10,
        numberInc: 1,
        numberHistory: [],
        numberCounter: 0,
    },
    food: {
        foodPizza: { checked: true, label: '🍕' },
        foodBurger: { checked: true, label: '🍔' },
        foodRamen: { checked: true, label: '🍜' },
        foodTaco: { checked: true, label: '🌮' },
        foodSushi: { checked: true, label: '🍣' },
        foodPasta: { checked: true, label: '🍝' },
        foodSandwich: { checked: true, label: '🥪' },
        foodSalad: { checked: true, label: '🥗' },
        foodChicken: { checked: true, label: '🍗' },
        foodBurrito: { checked: true, label: '🌯' },
        foodCurry: { checked: true, label: '🍛' },
        foodMeat: { checked: true, label: '🥩' },
        foodSoup: { checked: true, label: '🥣' },
        foodChinese: { checked: true, label: '🥡' },
        foodBreakfast: { checked: true, label: '🥞' },
        foodFish: { checked: true, label: '🐟' },
        foodHistory: [],
        foodCounter: 0,
    }
};

export let save = {
    ...defaultValues,
    number: { ...defaultValues.number },
    food: { ...defaultValues.food },
}

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
            save.number = { ...defaultValues.number };
            break;
        case 'food':
            save.food = { ...defaultValues.food };
            break;
        default:
            console.log('Not an Option');
    }
    saveSettings();
}