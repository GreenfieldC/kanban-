'use strict';

const initSummary = async () => {
	await loadSideMenuHeader();
	renderGreeting();
	document.getElementById('summary-btn').classList.add('active');
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
const setGreeting = () => {
	const hours = timeOfDay();
	if (morning(hours)) return 'Good Morning,';
	if (afternoon(hours)) return 'Good Day,';
	return 'Good Evening,';
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
	document.getElementById('greeting-title').innerHTML = setGreeting();
};
