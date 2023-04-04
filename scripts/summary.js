'use strict';

let inBoard = document.getElementById('tasks-in-board');
let toDo = document.getElementById('to-do');
let inProgress = document.getElementById('tasks-in-progress');
let awaitingFeedback = document.getElementById('awaiting-feedback');
let done = document.getElementById('done');
let urgent = document.getElementById('urgent');

const numbers = {
	inBoard: 0,
	toDo: 0,
	inProgress: 0,
	awaitingFeedback: 0,
	done: 0,
	urgent: 0,
};

const initSummary = async () => {
	await loadAllUsers();
	await loadAllTasks();
	await loadLoginUserIndex();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderGreeting();
	getCurrentNumbers();
	setCurrentNumbers();
	setNextDueDate();
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

/*================ 
NUMBERS FUNCTIONS
=================*/

/**
 * Gets current numbers
 */
const getCurrentNumbers = () => {
	numbers.inBoard = allTasks.length;
	numbers.toDo = allTasks.filter((task) => task.workflow === 'todo').length;
	numbers.inProgress = allTasks.filter((task) => task.workflow === 'in-progress').length;
	numbers.awaitingFeedback = allTasks.filter((task) => task.workflow === 'awaiting-feedback').length;
	numbers.done = allTasks.filter((task) => task.workflow === 'done').length;
	numbers.urgent = allTasks.filter((task) => task.priority === 'urgent').length;
};

/**
 * Sets current numbers in summary
 */
const setCurrentNumbers = () => {
	inBoard.innerHTML = numbers.inBoard;
	toDo.innerHTML = numbers.toDo;
	inProgress.innerHTML = numbers.inProgress;
	awaitingFeedback.innerHTML = numbers.awaitingFeedback;
	done.innerHTML = numbers.done;
	urgent.innerHTML = numbers.urgent;
};

/*================ 
NEXT DUE DATE FUNCTIONS
=================*/

/**
 * Sets next due date
 */
const setNextDueDate = () => {
	const futureTasks = filterFutureTasks();
	const openTasks = futureTasks.filter((task) => task.workflow !== 'done'); // filter out done tasks
	const nextTask = openTasks.sort((a, b) => a.dueDate - b.dueDate)[futureTasks.length - 1];

	const nextDueDate = formatDate(nextTask);
	console.log(nextDueDate);

	let deadLine = document.getElementById('deadline');

	if (nextDueDate === todayFormatted()) {
		deadLine.innerHTML = 'Today';
		return;
	}
	deadLine.innerHTML = nextDueDate;
};

/**
 * Filters tasks with due date in the future
 * @returns {array} filtered tasks
 */
const filterFutureTasks = () => {
	const filteredTasks = allTasks.filter((task) => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);
		return new Date(task.dueDate) > yesterday;
	});
	return filteredTasks;
};

/**
 * Formats date to be displayed (e.g.January 24, 2021)
 * @param {object} nextTask
 * @returns {string} formatted date
 */
const formatDate = (nextTask) => {
	if (!nextTask) return 'No open urgent tasks';
	const dateString = nextTask.dueDate;
	const date = new Date(dateString);
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = date.toLocaleDateString('en-US', options);
	return formattedDate;
};

/**
 *  @returns {string} today's date
 */
const todayFormatted = () => {
	const today = new Date();
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = today.toLocaleDateString('en-US', options);
	return formattedDate;
};
