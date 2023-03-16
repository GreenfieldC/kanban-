'use strict';

const initSummary = async () => {
	await loadAllUsers();
	await loadAllTasks();
	await loadLoginUserIndex();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderGreeting();
	console.log(logInUserIndex);
};

/*================ 
GREETING FUNCTIONS
=================*/

/**
 * Gets time in hours
 * @returns {number} hours
 */
const timeOfDay = () => {
	const date = new Date();
	const hours = date.getHours();
	return hours;
};

/**
 * Depending on time returns greeting
 * @param {number} hours
 * @returns {string} fitting greeting
 */
const setSalutation = () => {
	const hours = timeOfDay();
	if (morning(hours)) return 'Good morning,';
	if (afternoon(hours)) return 'Good afternoon,';
	return 'Good evening,';
};

/**
 * @param {number} hours
 * @returns {boolean} true if hours are between 0 and 12
 */
const morning = (hours) => {
	return hours >= 0 && hours < 12;
};

/**
 * @param {number} hours
 * @returns {boolean} true if hours are between 12 and 18
 */
const afternoon = (hours) => {
	return hours >= 12 && hours < 18;
};

/**
 * Renders greeting
 */

const renderGreeting = () => {
	renderSalutation();
	renderGreetingName();
};

/**
 * Renders salutation
 */
const renderSalutation = () => {
	document.getElementById('greeting-title').innerHTML = setSalutation();
};

/**
 * Renders name to be greeted
 */
const renderGreetingName = () => {
	document.getElementById('greeting-name').innerHTML = allUsers[logInUserIndex].name;
};
