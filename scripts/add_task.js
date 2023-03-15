'use strict';
let categoryList = [
	{ title: 'Function', color: 'red' },
	{ title: 'Design', color: 'blue' },
	{ title: 'Bug', color: 'green' },
	{ title: 'Feature', color: 'pink' },
	{ title: 'Test', color: 'orangered' },
	{ title: 'Other', color: 'purple' },
];

const initAddTask = async () => {
	await loadSideMenuHeader();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await loadAllUsers();
	await loadLoginUserIndex();
	renderCategoryList();
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
const categoryCancelBtn = document.getElementById('cancel-category');
const categoryConfirmBtn = document.getElementById('confirm-category');
const colorOptions = document.getElementById('color-options');
const newCategoryInputField = document.getElementById('new-category-input');
const innerCategoryInput = document.getElementById('category-color-container');
const selectedCategory = document.getElementById('selected-category');
let newCategoryTitle = '';
const dropDownCategoryList = document.getElementById('drop-down-list-category');
let title = '';
let selectedColor = '';

/*
!===Select Category ===*/

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

/* const confirmNewCatergory = () => {
	newCategoryTitle = document.getElementById('new-category-input').value;
}; */

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
	const categoryTitle = document.getElementById(`${id}.category`).innerHTML;
	const categoryColor = document.getElementById(`${id}.category-color`).style.backgroundColor;
	transferToInput(categoryTitle, categoryColor);
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
	categoryList.forEach((category, id) => {
		console.log(id);
		generatesCategoryListHtml(id, category.title, category.color);
	});
};

/**
 * Choose color for new category
 */
const chooseColor = (color) => {
	title = newCategoryInputField.value;
	if (title == '') {
		alert('Please first choose a title for your new category');
		return;
	}
	selectedColor = document.getElementById(color).style.backgroundColor;
	transferColorToInput(selectedColor);
	transferNewCatergoryToInput(title);
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

const confirmNewCatergory = () => {
	checkIfCategoryExists();
	if (checkIfCategoryExists()) return;
};

const checkIfCategoryExists = () => {
	let title = selectedCategory.innerHTML;
	categoryList.filter((category) => {
		if (category.title == title) {
			alert('Category already exists');
			return true;
		}
		console.log('hallo');
	});
};

/*
!===Assigned To ===*/
const dropDownAssignedToList = document.getElementById('drop-down-list-assigned-to');

/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = () => {
	dropDownAssignedToList.innerHTML = '';
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) {
			generatesAssignedToListWithUsers(id, user.name);
		} else {
			generatesAssignedToListElementForLoggedInUser(id, user.name);
		}
	});
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
