'use strict';

const initSummary = async () => {
	await loadSideMenuHeader();
	renderGreeting();
	document.getElementById('summary-btn').classList.add('active');
};

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
 * @returns string fitting greeting
 */
const getGreeting = () => {
	const hours = timeOfDay();
	if (hours >= 0 && hours < 12) return 'Good Morning,';
	if (hours >= 12 && hours < 18) return 'Good Day,';
	return 'Good Evening,';
};

/**
 * Renders greeting
 */
const renderGreeting = () => {
	getGreeting();
	document.getElementById('greeting-title').innerHTML = getGreeting();
};
