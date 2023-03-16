'use strict';
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
let addTaskSelectedColor = document.getElementById('selected-color');

let taskTitle = '';
let taskDescription = '';
let categoryTitle = '';
let selectedColor = '';
let taskForce = [];
let taskPriority = '';
let subtasks = [];
let dueDate = '';

const initAddTask = async () => {
	await loadSideMenuHeader();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await loadAllUsers();
	await loadLoginUserIndex();
	renderWholeCatergoryList();
	rendersAssignedToList();
	addCheckKeyToAllUsers();
	document.getElementById('add-task-btn').classList.add('active');
	document.getElementById('bottom-add-task-btn').classList.add('active');
	setsDatePicker();
	dueDate = currentDate();
	/* loadAllTasks(); */ //!testing
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
categoryCancelBtn.addEventListener('click', () => {
	cancelNewCategory();
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
	console.log(categoryTitle, selectedColor);
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
const renderBadgesAddTask = () => {
	assignedToBadges.innerHTML = '';
	taskForce.forEach((user) => {
		generateBadgesForAssignedTo(user.name, user.color, user.initials);
	});
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

/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = () => {
	dropDownAssignedToList.innerHTML = '';
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) generatesAssignedToListWithUsers(id, user.name);
		if (id == logInUserIndex) generatesAssignedToListElementForLoggedInUser(id, user.name);
	});
};

/**
 * Toggles the checkmark on and off of checkmark in assigned to list
 * @param {number} id
 */
const selectToggle = (id) => {
	let checkMark = document.getElementById(`${id}.-coworker-checkbox`);
	checkMark.checked = !checkMark.checked;
	allUsers[id].check == false ? (allUsers[id].check = true) : (allUsers[id].check = false);

	if (allUsers[id].check == true) {
		taskForce.push(userObjectForTaskForce(id));
	}

	if (allUsers[id].check == false) {
		let index = taskForce.findIndex((user) => user.id == id);
		if (index > -1) taskForce.splice(index, 1);
	}
	console.table(taskForce);
	renderBadgesAddTask();
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

/*
!Due Date  */

const resetDueDateToToday = () => {
	let dueDateInput = document.getElementById('due-date-add-task-input');
	dueDateInput.value = currentDate();
};

/*
!Priority Buttons  */

/**
 * Shows selected priority with color on button and sets priority
 * @param {string} priority
 * @param {string} color
 */
const selectPriority = (priority, color) => {
	resetColorAllPriorityBtns();
	visuallySelectPriority(priority, color);
	taskPriority = priority;
};

/**
 * Resets the color of all priority buttons
 */
const resetColorAllPriorityBtns = () => {
	let btns = ['urgent', 'medium', 'low'];
	btns.forEach((btn) => {
		const prioBtn = document.getElementById(`select-${btn}`);
		prioBtn.style.backgroundColor = '';
		prioBtn.style.boxShadow = '';
		const text = document.getElementById(`${btn}-text`);
		text.style.color = '';
		const svg = document.getElementById(`${btn}-svg`);
		svg.style.color = '';
	});
};

/**
 * Adds color to selected priority button
 * @param {string} priority
 * @param {string} color
 */
const visuallySelectPriority = (priority, color) => {
	const btn = document.getElementById(`select-${priority}`);
	btn.style.backgroundColor = color;
	btn.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
	const text = document.getElementById(`${priority}-text`);
	text.style.color = '#ffffff';
	const svg = document.getElementById(`${priority}-svg`);
	svg.style.color = '#ffffff';
};

/*
!Subtasks */

/**
 * Adds new subtask to subtask list
 * @returns {boolean} true if subtask input is empty
 */
const addSubTask = () => {
	let subTask = document.getElementById('subtasks-input');

	if (checkInputSubTaskEmpty(subTask)) return;
	subtasks.push(subTaskObject(subTask.value));
	renderNewSubTasks(subTask.value);
	document.getElementById('subtasks-input').value = '';
};

/**
 *
 * @param {string} subTask
 * @returns {boolean} true if subtask input is empty
 */
const checkInputSubTaskEmpty = (subTask) => {
	if (subTask.value == '') {
		subTask.value = 'No empty subtasks allowed';
		setTimeout(() => {
			subTask.value = '';
		}, 3000);
		return true;
	}
};

/**
 * @param {string} subtask
 * @returns {object} subtask object
 */
const subTaskObject = (subtask) => {
	let subTaskObject = {
		title: subtask,
		check: false,
	};
	return subTaskObject;
};

/**
 * Generates subtask element
 */
const renderNewSubTasks = () => {
	subTaskList.innerHTML = '';
	subtasks.forEach((subTask, id) => {
		generateSubTask(subTask.title, id);
	});
};

/**
 * Takes subtask of subtask list and generates subtask element
 * @param {number} id
 */
const deleteSubtask = (id) => {
	subtasks.splice(id, 1);
	renderNewSubTasks();
};

/**
 * Resets the add task formular to default
 */
const clearAddTaskFormular = () => {
	taskTitle = '';
	taskDescription = '';
	categoryTitle = '';
	selectedColor = '';
	taskForce = [];
	taskPriority = '';
	subtasks = [];
	renderNewSubTasks();
	renderBadgesAddTask();
	cancelNewCategory();
	addTaskTitle.value = '';
	addTaskDescription.value = '';
	removeCheckMarksFromAssignedTo();
	addCheckKeyToAllUsers();
	resetColorAllPriorityBtns();
	resetDueDateToToday();
	dueDate = currentDate();
};

/**
 * Pushes new task to allTasks json
 * @param {string} workflow is set to 'todo', 'awaiting feedback 'in progress' or 'done'
 * depending on with what btn the task was created
 */
const createTask = (workflow) => {
	let task = {
		title: addTaskTitle.value,
		description: addTaskDescription.value,
		category: categoryTitle,
		color: selectedColor,
		taskForce: taskForce,
		priority: taskPriority,
		subtasks: subtasks,
		dueDate: dueDate,
		workflow: workflow,
	};
	allTasks.push(task);
	saveAllTasks();
	console.log(allTasks);
	setTimeout(() => {
		clearAddTaskFormular();
	}, 3000);
};

/**
 * Removes checkmarks from assigned to dropdown
 */
const removeCheckMarksFromAssignedTo = () => {
	let checkMarks = document.querySelectorAll('[id*=".\\-coworker-checkbox"]');
	checkMarks.forEach((checkMark) => {
		checkMark.checked = false;
	});
};

//!Add stop propagation to the dropdown menu

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
