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
    food: {}
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
        return save;
    }
    else
        return null;
}