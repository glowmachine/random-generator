export let save = {
    //default values
    lastVisited: 'number',
    number: {
        min: 1,
        max: 10,
        inclusive: 1,
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