// ==UserScript==
// @name         Reddit - Auto Device Theme
// @namespace    https://thealiendrew.github.io/
// @version      1.0.1
// @description  Makes reddit match the device theme at all times.
// @author       AlienDrew
// @match        https://www.reddit.com/*
// @downloadURL  https://raw.githubusercontent.com/TheAlienDrew/Tampermonkey-Scripts/master/Reddit/Reddit-Auto-Device-Theme.user.js
// @icon         https://www.redditinc.com/assets/images/site/reddit-logo.png
// @grant        none
// ==/UserScript==

const BG_VAR = '--background';
const DARK_BG = '#1A1A1B';
const LIGHT_BG = '#FFFFFF';
const pageDivSelector = 'body > div > div';
const userMenuSelector = '#USER_DROPDOWN_ID';
const darkModeSwitchSelector = 'button[role="switch"]';

var watchEventTriggered = false;
var activeElement = null;

function updateTheme(changeToScheme) {
    let pageDiv = document.querySelector(pageDivSelector);
    let background = getComputedStyle(pageDiv).getPropertyValue(BG_VAR);

    let theme = 'light';
    if (background == DARK_BG) theme = 'dark';

    if (theme != changeToScheme) {
        let userMenu = document.querySelector(userMenuSelector);
        userMenu.click();

        let darkModeSwitch = document.querySelector(darkModeSwitchSelector);
        darkModeSwitch.click();

        if (watchEventTriggered) activeElement.focus();
    }

    watchEventTriggered = false;
}

// wait for the page to be fully loaded
window.addEventListener('load', function () {
    // now we can start
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        watchEventTriggered = true;
        activeElement = document.activeElement;
        updateTheme(newColorScheme);
    });

    // first time run
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
        updateTheme('dark');
    } else {
        // light mode
        updateTheme('light');
    }
}, false);