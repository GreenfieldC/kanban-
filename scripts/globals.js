'use strict';

const overlay = document.getElementById('overlay');

const loadSideMenuHeader = async () => {
	await includeHTML();
	addSideMenuButtonListener();
};

const includeHTML = async () => {
	let includeElements = document.querySelectorAll('[w3-include-html]');
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		let file = element.getAttribute('w3-include-html');
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = 'Page not found';
		}
	}
};

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
const addSideMenuButtonListener = () => {
	const sideMenuBtn = document.getElementById('open-close-btn-side-menu');
	sideMenuBtn.addEventListener('click', toggleSideMenu);
};

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
