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
    //turn the object into an array and find the matching id for each key
    Object.keys(save.number).forEach((key) => {
        const input = document.getElementById(key);
        if (input) {
            input.value = save.number[key];
        }
    });
    //clamp range for number input
    document.querySelector('.number__min').max = save.number.max;
    document.querySelector('.number__max').min = save.number.min;
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
    document.querySelector('.number__min').addEventListener('change', (e) => {
        const minValue = Number(e.target.value);
        document.querySelector('.number__max').min = minValue;
        save.number.min = minValue;
    });
    document.querySelector('.number__max').addEventListener('change', (e) => {
        const maxValue = Number(e.target.value);
        document.querySelector('.number__min').max = maxValue;
        save.number.max = maxValue;
    });
    document.querySelector('.number__inclusive').addEventListener('change', (e) => {
        save.number.inclusive = Number(e.target.value);
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