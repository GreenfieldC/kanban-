'use strict';

let subtaskOnDisplay = false;
let addTaskMainSite = true;
let selectedTaskToEditId;
let editTaskCard = false;
let inContactsAddTask = false;

let categoryList = [
	{ title: 'Function', color: 'red' },
	{ title: 'Design', color: 'blue' },
	{ title: 'Bug', color: 'green' },
	{ title: 'Feature', color: 'pink' },
	{ title: 'Test', color: 'orangered' },
	{ title: 'Other', color: 'purple' },
];

const main = document.getElementById('main-container');
const assignedInput = document.getElementById('assign-input');
const categoryInput = document.getElementById('category-input');
const categoryDropDownBtn = document.getElementById('category-drop-down');
const categoryConfirmCancelBtn = document.getElementById('cancel-confirm-category');
const categoryCancelBtn = document.getElementById('cancel-category');
const categoryConfirmBtn = document.getElementById('confirm-category');
const colorOptions = document.getElementById('color-options');
const newCategoryInputField = document.getElementById('new-category-input');
const innerCategoryInput = document.getElementById('category-color-container');
const selectedCategory = document.getElementById('selected-category');
const dropDownCategoryList = document.getElementById('drop-down-list-category');
let assignedToBadges = document.getElementById('taskforce-badge-container');
let subTaskList = document.getElementById('subtask-container');

let addTaskTitle = document.getElementById('add-task-title');
let addTaskDescription = document.getElementById('add-task-description');
let subTaskInput = document.getElementById('subtasks-input');

let addTaskSelectedColor = document.getElementById('selected-color');

let taskTitle = '';
let taskDescription = '';
let categoryTitle = '';
let selectedColor = '';
let taskForce = [];
let taskPriority = '';
let subtasks = [];
let dueDate = '';

/* Invalid tags */
let requiredTitle = document.getElementById('required-title');
let requiredDescription = document.getElementById('required-description');
let requiredCategory = document.getElementById('required-category');
let requiredAssignedTo = document.getElementById('required-assigned-to');
let requiredPriority = document.getElementById('required-priority');

const initAddTask = async () => {
	if (addTaskMainSite) await includeHTML();
	highlightSideMenuButton('add_task');
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await load();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
	renderWholeCatergoryList();
	rendersAssignedToList(dropDownAssignedToList, 'add-task');
	addCheckKeyToAllUsers();
	setsDatePicker();
	dueDate = currentDate();
	/* loadAllTasks(); */
	addTaskMainSite = true;
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

/*
!===Select Category ===*/

/**
 * Renders the whole category list
 */
const renderWholeCatergoryList = () => {
	dropDownCategoryList.innerHTML = '';
	renderCategoryList();
	renderNewCategoryElementInList();
};

const categoryBtn = document.getElementById('category-drop-down');
categoryBtn.addEventListener('click', () => {
	dropDownCategoryList.classList.toggle('d-block');
	categoryInput.classList.toggle('input-toggle');
});

/**
 * Prepares the input field for a new category
 */
const newCategoryInput = () => {
	categoryTitle = '';
	selectedColor = '';
	innerCategoryInput.classList.add('d-none');
	categoryDropDownBtn.classList.add('d-none');
	categoryConfirmCancelBtn.classList.remove('d-none');
	colorOptions.classList.remove('d-none');
	newCategoryInputField.classList.remove('d-none');
	newCategoryInputField.value = '';
	newCategoryInputField.focus();
};

/**
 * Eventlistener for the cancel button in category input
 */
categoryCancelBtn.addEventListener('click', (event) => {
	cancelNewCategory();
	event.stopPropagation();
});

/**
 * Cancels the creation of a new category
 */
const cancelNewCategory = () => {
	innerCategoryInput.classList.remove('d-none');
	categoryDropDownBtn.classList.remove('d-none');
	categoryConfirmCancelBtn.classList.add('d-none');
	colorOptions.classList.add('d-none');
	newCategoryInputField.classList.add('d-none');
	document.getElementById('selected-category').innerHTML = 'Select a Category';
	document.getElementById('selected-color').style.backgroundColor = '';
};

/**
 * Choose Category from Dropdown List
 */
const chooseCategory = (id) => {
	const categoryTitleList = document.getElementById(`${id}.category`).innerHTML;
	const categoryColorList = document.getElementById(`${id}.category-color`).style.backgroundColor;
	categoryTitle = categoryTitleList;
	selectedColor = categoryColorList;
	transferToInput(categoryTitleList, categoryColorList);
};

/**
 * Transfers the chosen category to the input field
 * @param {string} categoryTitle
 * @param {string} categoryColor
 */
const transferToInput = (categoryTitle, categoryColor) => {
	document.getElementById('selected-category').innerHTML = categoryTitle;
	document.getElementById('selected-color').style.backgroundColor = categoryColor;
};

/**
 * Generates the html for the category list
 * @param {number} id
 * @param {string} categoryTitle
 * @param {string} categoryColor
 */
const renderCategoryList = () => {
	categoryList.sort((a, b) => a.title.localeCompare(b.title)); // sort by title
	categoryList.forEach((category, id) => {
		generatesCategoryListHtml(id, category.title, category.color);
	});
};

/**
 * Choose color for new category
 */
const chooseColor = (color) => {
	categoryTitle = newCategoryInputField.value;
	if (categoryTitle == '') {
		alert('Please first choose a title for your new category');
		return;
	}
	selectedColor = document.getElementById(color).style.backgroundColor;
	transferColorToInput(selectedColor);
	transferNewCatergoryToInput(categoryTitle);
	showNewCategory();
};

/**
 *
 * @param {string} color
 */
const transferColorToInput = (color) => {
	document.getElementById('selected-color').style.backgroundColor = color;
};

/**
 * Transfers new catergory with color to input field
 */
const transferNewCatergoryToInput = (title) => {
	selectedCategory.innerHTML = title;
};

/**
 * Show new category in Input field
 */
const showNewCategory = () => {
	innerCategoryInput.classList.remove('d-none');
	newCategoryInputField.classList.add('d-none');
};

/**
 * Add new category to category list and render it
 * @returns {boolean} true if category already exists
 */
const confirmNewCatergory = () => {
	if (checkIfCategoryExists() === true) {
		alert('Dobble entry. Choose another title for your category');
		return;
	}

	if (newCategoryInputField.value == '') {
		alert('Please choose a title for your new category');
		return;
	}

	if (addTaskSelectedColor.style.backgroundColor == '') {
		alert('Please choose a color for your new category');
		return;
	}

	addsNewCategoryToCategoryList();
	setCategoryColor();
	renderWholeCatergoryList();
	categoryDropDownBtn.classList.remove('d-none');
	categoryConfirmCancelBtn.classList.add('d-none');
	colorOptions.classList.add('d-none');
};

/**
 * Sets the color of the new category
 */
const setCategoryColor = () => {
	selectedColor = document.getElementById('selected-color').style.backgroundColor;
};

/**
 * Checks if the category already exists
 * @returns {boolean} true if category already exists
 */
const checkIfCategoryExists = () => {
	let title = selectedCategory.innerHTML;
	return categoryList.some((category) => {
		if (category.title === title) return true;
		return false;
	});
};

/**
 * Adds new category to category list
 */
const addsNewCategoryToCategoryList = () => {
	categoryList.push({ title: categoryTitle, color: selectedColor });
};

//render badges of taskForce
const renderBadgesAddTask = (taskIndex) => {
	if (!subtaskOnDisplay) {
		assignedToBadges.innerHTML = '';
		taskForce.forEach((user) => {
			generateBadgesForAssignedTo(user.name, user.color, user.initials);
		});
	}

	editTaskCard ? (taskIndex = selectedTaskToEditId) : null; //need to get right data
	if (subtaskOnDisplay) {
		let badgesContainer = document.getElementById('taskforce-badge-container-edit-task');
		badgesContainer.innerHTML = '';
		allTasks[taskIndex].taskForce.forEach((user) => {
			generateBadgesForAssignedTo(user.name, user.color, user.initials, badgesContainer);
		});
	}
};

/*
!===Assigned To ===*/
/**
 * Adds check key to all users
 * for assigning a task to a user
 */
const addCheckKeyToAllUsers = () => {
	allUsers.forEach((user) => {
		user.check = false;
	});
};

const dropDownAssignedToList = document.getElementById('drop-down-list-assigned-to');
/* const dropDownAssignedToListEditTask = document.getElementById('drop-down-list-assigned-to-edit-task'); */

/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = (container, location) => {
	container.innerHTML = '';
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) generatesAssignedToListWithUsers(id, user.name, container, location);
		if (id == logInUserIndex) generatesAssignedToListElementForLoggedInUser(id, user.name, container, location);
	});
};

/**
 * Toggles the checkmark on and off of checkmark in assigned to list
 * @param {number} id
 */
const selectToggle = (id, location) => {
	let checkMark = document.getElementById(`${id}.-coworker-checkbox-${location}`);
	checkMark.checked = !checkMark.checked;
	allUsers[id].check = !allUsers[id].check;

	if (editTaskCard) {
		if (allUsers[id].check == true) {
			allTasks[selectedTaskToEditId].taskForce.push(userObjectForTaskForce(id));
		}

		if (allUsers[id].check == false) {
			let index = allTasks[selectedTaskToEditId].taskForce.findIndex((user) => user.id == id);
			if (index > -1) allTasks[selectedTaskToEditId].taskForce.splice(index, 1);
		}
	}

	if (allUsers[id].check == true) {
		taskForce.push(userObjectForTaskForce(id));
	}

	if (allUsers[id].check == false) {
		let index = taskForce.findIndex((user) => user.id == id);
		if (index > -1) taskForce.splice(index, 1);
	}
	console.table(subtaskOnDisplay);
	renderBadgesAddTask();
};

const checkDoppleEntryInTaskForce = (id) => {
	let index = allTasks[selectedTaskToEditId].taskForce.findIndex((user) => user.id == id);
	if (index > -1) return true;
	return false;
};

/**
 *
 * @param {number} id
 * @returns object with user info
 */
const userObjectForTaskForce = (id) => {
	let userObject = {
		id: id,
		name: allUsers[id].name,
		email: allUsers[id].email,
		initials: allUsers[id].initials,
		color: allUsers[id].color,
		check: allUsers[id].check,
	};
	return userObject;
};

/**
 * Eventlistener for the assigned to dropdown
 */
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
