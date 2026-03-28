import { save, loadSettings } from './save.js';

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

function saveSettings() {
    localStorage.setItem('rngSettings', JSON.stringify(save));
}

function setNumberSettings() {
    //turn the save data into an array and find the matching id for each key
    Object.keys(save.number).forEach((key) => {
        const input = document.getElementById(key);
        if (input) {
            input.value = save.number[key];
        }
    });
    //clamp range for number input
    document.getElementById('numberMin').max = save.number.numberMax;
    document.getElementById('numberMax').min = save.number.numberMin;
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

function updateSettingsListener() {
    const settingsWindow = document.querySelector('.menu');
    document.addEventListener('click', (e) => {
        if (!settingsWindow.contains(e.target)) {
            saveSettings();
            goToPage();
        }
    });
}

function init() {
    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
        setNumberSettings();

        menuTabListener();
        menuNumberSettingsListener();

        updateSettingsListener();
    });
}

init();