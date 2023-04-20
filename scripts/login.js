'use strict';

let rememberUser = false;
let rememberEmail;
let rememberPassword;

const initLogin = () => {
	loadRememberMe();
	if (rememberUser) getRememberMe();
	greetingOnce = false;
	saveGreetingOnce();
	startAnimation();
	setURL('https://join.christian-greenfield.de/smallest_backend_ever');
	load();
};

/**
 * Checks login form
 */
const checkLoginForm = () => {
	const { email, password } = logInInputValues();
	if (rememberUser) setRememberMe(email, password);
	checkLogInUser(email, password);
};

/**
 * Gets the values of the input fields
 * @returns {object} - returns an object with the values of the input fields
 */
const logInInputValues = () => {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	return { email: email, password: password };
};

/**
 * Check in user
 * @param {string} email
 * @param {string} password
 * @returns
 */
const checkLogInUser = async (email, password) => {
	const user = allUsers.findIndex((user) => user.email === email && user.password === password);
	const rightPassword = allUsers.findIndex((user) => user.email === email && user.password !== password);
	const rightEmail = allUsers.findIndex((user) => user.email === email);

	if (rightEmail === -1) {
		showFeedbackMessage('login-email-feedback');
		return;
	}

	if (rightPassword !== -1) {
		showFeedbackMessage('login-password-feedback');
		return;
	}

	if (user === -1) return;

	logIn(user);
};

/**
 * Logs in the user
 * @param {*} user
 */
const logIn = async (user) => {
	if (user) {
		logInUserIndex = user;
		await saveLoginUserIndex();
		setTimeout(() => {
			window.location.href = 'summary.html';
		}, 125);
	}
};

/**
 * Logs in the user as a guest
 */
const guestLogin = () => {
	logInUserIndex = 0;
	saveLoginUserIndex();
	setTimeout(() => {
		window.location.href = 'summary.html';
	}, 125);
};

/**
 * Show start animation
 */
const startAnimation = () => {
	setTimeout(() => {
		document.getElementById('login-animation').classList.add('transform-animation-overlay');
		document.getElementById('join-logo-animation').classList.add('transfer-join-logo');
	}, 500);
	setTimeout(() => {
		document.getElementById('login-animation').style.zIndex = -1;
	}, 500);
};

/**
 * Sets rememberUser to true or false
 */
const rememberMe = () => {
	rememberUser = !rememberUser;
};

/**
 * Saves or removes the rememberMe data
 * @param {string} email
 * @param {string} password
 */
const setRememberMe = (email, password) => {
	if (rememberUser) {
		rememberEmail = email;
		rememberPassword = password;
		saveRememberMe();
	} else {
		removeRememberMe();
	}
};

/**
 * Gets the rememberMe data and sets the input fields
 */
const getRememberMe = () => {
	let email = document.getElementById('email');
	let password = document.getElementById('password');
	email.value = rememberEmail;
	password.value = rememberPassword;
};

/**
 * Saves the rememberMe data in the local storage
 */
const saveRememberMe = () => {
	localStorage.setItem('rememberMe', true);
	localStorage.setItem('rememberEmail', rememberEmail);
	localStorage.setItem('rememberPassword', rememberPassword);
};

/**
 * Loads the rememberMe data from the local storage
 * @returns
 */
const loadRememberMe = () => {
	if (localStorage.getItem('rememberMe') === null) return;
	rememberUser = localStorage.getItem('rememberMe');
	rememberEmail = localStorage.getItem('rememberEmail');
	rememberPassword = localStorage.getItem('rememberPassword');
};

/**
 * Removes the rememberMe data from the local storage
 */
const removeRememberMe = () => {
	localStorage.removeItem('rememberMe');
	localStorage.removeItem('rememberEmail');
	localStorage.removeItem('rememberPassword');
};
