'use-strict';

let allUsers = [];

const initSignUp = () => {
	loadAllUsers();
};

const checkForm = () => {
	signUpInputValues();
	const { name, email, password } = signUpInputValues();
	const initials = createInitials(name);
	userObject(name, email, password, initials);
	noDuplicateEmail(email);
	checkMessageEmailNotAvailable(email);
	checkAddNewUser(name, email, password, initials);
};

/**
 * Gets the values of the input fields
 * @returns {object} - returns an object with the values of the input fields
 */
const signUpInputValues = () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	return { name: name, email: email, password: password };
};

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object} - returns an object with the user's name, email, password and phone number
 */
const userObject = (name, email, password, initials) => {
	return {
		name: name,
		email: email,
		password: password,
		phone: 'N/A',
		initials: initials,
	};
};

/**
 * @param {string} email
 * @returns {boolean} - returns true if the email is already in the database, else returns false
 */
const noDuplicateEmail = (email) => {
	const noDuplicateEmail = allUsers.findIndex((user) => user.email === email);
	if (noDuplicateEmail === -1) return true;
	return false;
};

//placeholder in email input field "Email is not available"
const checkMessageEmailNotAvailable = (email) => {
	if (!noDuplicateEmail(email)) {
		const emailInput = document.getElementById('email');
		emailInput.value = '';
		emailInput.placeholder = 'Email is not available';
		emailInput.style.border = '1px solid red';
		emailInput.style.color = 'red';
	}
};

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object} - adds a new user to the database
 */
const checkAddNewUser = (name, email, password, initials) => {
	if (!noDuplicateEmail(email)) return;
	allUsers.push(userObject(name, email, password, initials));
	saveAllUsers();
	/* forwardToLoginIn(); */
};

/**
 * Redirects to the login page
 */
const forwardToLoginIn = () => {
	window.location.href = 'index.html';
};

/**
 *
 * @param {string} name
 * @returns
 */
const createInitials = (name) => {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('');
	return initials;
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
const loadAllUsers = () => {
	let allUsersAsString = localStorage.getItem('allUsers');
	allUsers = JSON.parse(allUsersAsString);
};
