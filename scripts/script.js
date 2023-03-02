/* Onload */

const body = document.body;
body.addEventListener('load', initSummary());

/*======== 
Side Menu 
=========*/

/**
 * Toggles the side menu
 */
const toggleSideMenu = () => {
	document.getElementById('side-menu').classList.toggle('side-menu-slider');
};

/**
 * Adds event listeners
 * @type {HTMLElement} side menu btn
 */
const sideMenuBtn = document.getElementById('open-close-btn-side-menu');
sideMenuBtn.addEventListener('click', toggleSideMenu);

/**
 * Closes the side menu
 */
const closeSideMenu = () => {
	document.getElementById('side-menu').classList.remove('side-menu-slider');
};

/**
 * Adds event listeners
 * @type {HTMLElement} main-container
 */
const sideMenuClose = document.getElementById('main-container');
sideMenuClose.addEventListener('click', closeSideMenu);

/*========== 
Open Section
===========*/

const summaryBtn = document.getElementById('summary-btn');
summaryBtn.addEventListener('click', initSummary);

const bottomSummaryBtn = document.getElementById('bottom-summary-btn');
bottomSummaryBtn.addEventListener('click', initSummary);

const helpBtn = document.getElementById('help-btn');
helpBtn.addEventListener('click', initHelp);
