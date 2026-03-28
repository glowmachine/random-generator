export let save = {
    //default values
    lastVisited: 'number',
    number: {
        numberMin: 1,
        numberMax: 10,
        numberInc: 1,
    },
    food: {}
};

export function loadSettings() {
    const data = JSON.parse(localStorage.getItem('rngSettings'));
    loadNumberSettings(data);
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