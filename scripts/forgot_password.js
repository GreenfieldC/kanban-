/* setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever'); */

const initForgotPassword = async () => {
	await loadAllUsers();
};

/**
 * Checks if the email is in the database
 * and if so, saves the user id to userIdResetPassword
 *
 */
const checkForgotPasswordForm = async () => {
	const email = document.getElementById('email').value;
	const user = await getUserByEmail(email);

	if (!user) {
		showFeedbackMessage('forgot-password-email-feedback');
		return;
	}

	if (user) {
		userIdResetPassword = user.id;
		saveUserIdResetPassword();
		loadUserIdResetPassword();
		setTimeout(() => {
			redirectToResetPassword();
		}, 2000);
		return;
	}
	alert('No user with this email found');
};

/**
 *
 * @param {string} email
 * @returns {object} user object or undefined
 */
const getUserByEmail = async (email) => {
	return allUsers.find((user) => user.email === email);
};

const redirectToResetPassword = async () => {
	window.location.href = 'reset_password.html';
};

const saveUserIdResetPassword = async () => {
	let userIdResetPasswordAsString = JSON.stringify(userIdResetPassword);
	localStorage.setItem('userIdResetPassword', userIdResetPasswordAsString);
};
