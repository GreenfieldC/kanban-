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
/* 
! TEST Validation Form Function */

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

/*==================
Window Management 
===================*/

const main = document.getElementById('main-container');
const assignedInput = document.getElementById('assign-input');
const categoryInput = document.getElementById('category-input');
const categoryDropDownBtn = document.getElementById('category-drop-down');
const categoryConfirmCancelBtn = document.getElementById('cancel-confirm-category');
const colorOptions = document.getElementById('color-options');

/*================ 
Select Category 
=================*/

const dropDownCategoryList = document.getElementById('drop-down-list-category');

const categoryBtn = document.getElementById('category-drop-down');
categoryBtn.addEventListener('click', () => {
	dropDownCategoryList.classList.toggle('d-block');
	categoryInput.classList.toggle('input-toggle');
});

const newCategory = document.getElementById('new-category');
newCategory.addEventListener('click', () => {
	newCategoryInput();
});

/**
 * Prepares the input field for a new category
 */
const newCategoryInput = () => {
	categoryInput.placeholder = 'New category name ';
	categoryInput.readOnly = false;
	categoryDropDownBtn.classList.add('d-none');
	categoryConfirmCancelBtn.classList.remove('d-none');
	colorOptions.classList.remove('d-none');
};

/**
 * Eventlistener for the cancel button
 */
const cancelCategoryBtn = document.getElementById('cancel-confirm-category');
cancelCategoryBtn.addEventListener('click', () => {
	cancelNewCategory();
});

/**
 * Cancels the creation of a new category
 */
const cancelNewCategory = () => {
	categoryInput.placeholder = 'Select category';
	categoryInput.readOnly = true;
	categoryDropDownBtn.classList.remove('d-none');
	categoryConfirmCancelBtn.classList.add('d-none');
	colorOptions.classList.add('d-none');
};

/* Assign To */
const dropDownAssignedToList = document.getElementById('drop-down-list-assigned-to');

const assignedToInput = document.getElementById('assigned-drop-down');
assignedToInput.addEventListener('click', () => {
	dropDownAssignedToList.classList.toggle('d-block');
	assignedInput.classList.toggle('input-toggle');
});

/**
 * ´Close Dropdowns when clicking outside
 */
main.addEventListener('click', () => {
	dropDownCategoryList.classList.remove('d-block');
	dropDownAssignedToList.classList.remove('d-block');
	assignedInput.classList.remove('input-toggle');
	categoryInput.classList.remove('input-toggle');
});

//Add stop propagation to the dropdown menu

dropDownCategoryList.addEventListener('click', (event) => {
	event.stopPropagation();
});

categoryBtn.addEventListener('click', (event) => {
	event.stopPropagation();
});

assignedToInput.addEventListener('click', (event) => {
	event.stopPropagation();
});

assignedInput.addEventListener('click', (event) => {
	event.stopPropagation();
});

dropDownAssignedToList.addEventListener('click', (event) => {
	event.stopPropagation();
});
