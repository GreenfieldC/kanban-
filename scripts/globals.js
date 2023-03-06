'use strict';
let logInUserIndex;
let allUsers = [
	{
		name: 'Guest',
		email: 'guest@web.de',
		password: 'Guest123.-',
		phone: 'N/A',
		initials: 'GG',
		color: '#FF7A00',
	},
];

/**
 * Saves the index of the logged in user to local storage
 */
const saveLoginUserIndex = async () => {
	let logInUserIndexAsString = JSON.stringify(logInUserIndex);
	localStorage.setItem('userIndex', logInUserIndexAsString);
};

/**
 * Loads the index of the logged in user from local storage
 */
const loadLoginUserIndex = async () => {
	let logInUserIndexAsString = localStorage.getItem('userIndex');
	logInUserIndex = JSON.parse(logInUserIndexAsString);
};

/**
 * Saves all users to local storage
 */
const saveAllUsers = () => {
	let allUsersAsString = JSON.stringify(allUsers);
	localStorage.setItem('allUsers', allUsersAsString);
};

/**
 * Loads all users from local storage
 */
const loadAllUsers = async () => {
	let allUsersAsString = localStorage.getItem('allUsers');
	allUsers = JSON.parse(allUsersAsString);
};

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
