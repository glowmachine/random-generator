import { save, loadSettings, saveSettings } from './save.js';

// FOOD FUNCTIONS ================================================
function setFoodSettings() {
    //for each possible food option, make an element
    Object.entries(save.food).forEach(([key, value]) => {
        let html;
        if (key === 'foodHistory') {
            document.getElementById('foodHistory').textContent = save.food.foodHistory.join(', ');
        } else if (key === 'foodCounter') {
            document.getElementById('foodCounter').textContent = save.food.foodCounter;
        } else {
            html = `
                <div>
                    <label for="${key}">${value.label} : </label>
                    <input type="checkbox" id="${key}" ${value.checked ? 'checked' : ""}>
                </div>
            `;
            let foodOptions = document.getElementById('food').querySelector('.menu__options--grid');
            foodOptions.insertAdjacentHTML('beforeend', html);
        }
    });

}

function menuFoodSettingsListener() {
    let foodOptions = document.getElementById('food').querySelectorAll('input');
    //for every input, add an event listener that saves the option's status to the save
    foodOptions.forEach((option) => {
        option.addEventListener('change', (e) => {
            save.food[option.id].checked = option.checked;
        });
    });
}

// NUMBER FUNCTIONS ==============================================

function setNumberSettings() {
    //turn the save data into an array and find the matching id for each key
    Object.keys(save.number).forEach((key) => {
        const element = document.getElementById(key);
        if (element.tagName === 'INPUT') {
            element.value = save.number[key];
        }
        if (element.id === 'numberHistory') {
            element.textContent = save.number[key].join(', ');
        }
        if (element.id === 'numberCounter') {
            element.textContent = save.number.numberCounter;
        }
    });
    //clamp range for number input
    document.getElementById('numberMin').max = save.number.numberMax;
    document.getElementById('numberMax').min = save.number.numberMin;
}

function menuNumberSettingsListener() {
    document.getElementById('numberMin').addEventListener('change', (e) => {
        const minValue = Number(e.target.value);
        document.getElementById('numberMax').min = minValue;
        save.number.numberMin = minValue;
    });
    document.getElementById('numberMax').addEventListener('change', (e) => {
        const maxValue = Number(e.target.value);
        document.getElementById('numberMin').max = maxValue;
        save.number.numberMax = maxValue;
    });
    document.getElementById('numberInc').addEventListener('change', (e) => {
        save.number.numberInc = Number(e.target.value);
    });
};

// GENERAL FUNCTIONS =============================================

function menuTabListener() {
    const tabs = document.querySelectorAll('.menu__tab-radio');
    //add a listener for every day
    tabs.forEach((tab) => {
        tab.addEventListener('change', (e) => {
            //hide all menu contents whenever a new tab is selected
            document.querySelectorAll('.menu__content').forEach((menuContent) => {
                menuContent.classList.remove('active');
            });
            //reveal the menu content associated with the selected tab
            document.getElementById(e.target.value).classList.add('active');
            save.lastVisited = e.target.value;
        });
    });
    goToTab(save.lastVisited);
}

function updateSettingsListener() {
    const settingsWindow = document.querySelector('.menu');
    document.addEventListener('click', (e) => {
        if (!settingsWindow.contains(e.target)) {
            saveSettings();
            goToPage();
        }
    });
}

function goToPage() {
    window.location.replace(`${save.lastVisited}.html`);
};

function goToTab() {
    let prev = save.lastVisited;
    const tab = document.getElementById(`radio-${prev}`);
    tab.checked = true;
    document.getElementById(tab.value).classList.add('active');
};

function init() {
    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
        menuTabListener();

        setNumberSettings();
        menuNumberSettingsListener();
        setFoodSettings();
        menuFoodSettingsListener();

        updateSettingsListener();
    });
}

init();