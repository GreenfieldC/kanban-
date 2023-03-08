'use strict';

const initAddTask = async () => {
	await loadSideMenuHeader();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await loadAllUsers();
	await loadLoginUserIndex();
	rendersAssignedToList();
	document.getElementById('add-task-btn').classList.add('active');
	document.getElementById('bottom-add-task-btn').classList.add('active');
	setsDatePicker();
};

/**
 * Sets date picker
 */
const setsDatePicker = () => {
	setsDefaultDateToToday();
	setsMinDateToToday();
};

/**
 * sets value to today's date
 */
const setsDefaultDateToToday = () => {
	document.getElementById('due-date-add-task-input').value = currentDate();
};

/**
 * The function setFutureDatesOnlyForInputDueDate()
 * sets the minimum date for the input element with
 * the id of dueDate to the current date.
 */
const setsMinDateToToday = () => {
	document.getElementById('due-date-add-task-input').min = currentDate();
};

/**
 *
 * @returns {string} today's date in the format of yyyy-mm-dd
 */
const currentDate = () => {
	let date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	if (month < 10) month = '0' + month;
	if (day < 10) day = '0' + day;

	let today = year + '-' + month + '-' + day;
	return today;
};

/* AssignedTo Functions */
let coworkerBox = document.getElementById('1.-coworker-box');
let checkMark = document.getElementById('1.-coworker-check');

/**
 * Coworker box click event listener to toggle checkmark on and off
 */
coworkerBox.addEventListener('click', () => {
	checkMark.checked == true ? (checkMark.checked = false) : (checkMark.checked = true);
});

/**
 * Checkmark click event listener to toggle checkmark on and off
 */
checkMark.addEventListener('click', () => {
	checkMark.checked == true ? (checkMark.checked = false) : (checkMark.checked = true);
});

/* Window Management */

const dropDownAssignedToList = document.getElementById('drop-down-list-assigned-to');

const assignedToInput = document.getElementById('assigned-drop-down');
assignedToInput.addEventListener('click', () => {
	dropDownAssignedToList.classList.toggle('d-block');
});

/*
! Close DropdownMenu */
