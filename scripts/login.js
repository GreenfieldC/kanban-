'use strict';

const initLogin = async () => {
	greetingOnce = false;
	saveGreetingOnce();
	startAnimation();
	setURL('https://join.christian-greenfield.de/smallest_backend_ever');
	/* saveAllUsers(); */ //! Handling no users not yet implemented
	loadAllUsers();
	/* load(); */
};

const checkLoginForm = () => {
	const { email, password } = logInInputValues();
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

	if (user) {
		logInUserIndex = user;
		await saveLoginUserIndex();
		setTimeout(() => {
			window.location.href = 'summary.html';
		}, 125);
	}
};

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
