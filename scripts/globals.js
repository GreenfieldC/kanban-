'use strict';
let logInUserIndex;
let greetingOnce = false;
let userIdResetPassword;
let allTasks = [];
let allUsers = [];
let inContacts = false;
const overlay = document.getElementById('overlay');

/*================
! Local Storage 
=================*/

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

/**
 * Saves all tasks to local storage
 */
const saveAllTasks = () => {
	let allTasksAsString = JSON.stringify(allTasks);
	localStorage.setItem('allTasks', allTasksAsString);
};

/**
 * Loads all tasks from local storage
 */
const loadAllTasks = async () => {
	if (localStorage.getItem('allTasks') === null) return;
	let allTasksAsString = localStorage.getItem('allTasks');
	allTasks = JSON.parse(allTasksAsString);
};

const saveGreetingOnce = () => {
	localStorage.setItem('greetingOnce', greetingOnce);
};

/**
 * Loads the greeting once variable from local storage
 * @returns
 */
const loadGreetingOnce = () => {
	if (localStorage.getItem('greetingOnce') === null) return;
	greetingOnce = localStorage.getItem('greetingOnce');
};

/**
 * Includes HTML templates into the DOM
 */
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

/**
 * Opens the add Task window
 * @param {string} container
 */
const addTask = async (container, contactId) => {
	clearAddTaskFormular();
	addTaskMainSite = false;
	await initAddTask();
	document.getElementById(container).style.display = 'flex';
	if (inContacts) {
		selectToggle(contactId, 'add-task');
	}
};

/**
 * Sets badges in header of logged in user
 */
const setMenuBadgeOfLoggedInUser = () => {
	let btn = document.getElementById('badge-btn-navbar');
	let initialsDiv = document.getElementById('badge-btn-navbar-initials');
	let color = allUsers[logInUserIndex].color;
	btn.style.backgroundColor = color;
	initialsDiv.innerHTML = allUsers[logInUserIndex].initials;
};

/* Redirect functions */

/**
 * Redirects to the login page
 */
const forwardToLoginIn = () => {
	setTimeout(() => {
		window.location.href = 'index.html';
	}, 2000);
};

/**
 * Adds active class to the side menu button
 * @param {string} location
 */
const highlightSideMenuButton = (location) => {
	let btnDesktop = document.getElementById(`${location}-btn`);
	let btnMobile = document.getElementById(`${location}`);
	if (document.URL.includes(`${location}`) && location !== 'legal-notice') {
		btnDesktop.classList.add('active');
		btnMobile.classList.add('active');
	}

	if (location === 'legal-notice') {
		btnDesktop.classList.add('active');
	}
};

/**
 * Show feedback message
 * @param {number} elementId
 */
const showFeedbackMessage = (elementId) => {
	const element = document.getElementById(elementId);
	element.style.opacity = 1;

	let opacity = 1;
	let interval = setInterval(() => {
		opacity -= 0.05;
		element.style.opacity = opacity;
		if (opacity <= 0) {
			clearInterval(interval);
		}
	}, 200);
};
