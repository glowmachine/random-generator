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
        //turn parsed json strings back into numbers 
        // save.number = data.number;
        for (let key in save.number) {
            save.number[key] = Number(data.number[key]);
        }
        return save;
    }
    else
        return null;
}