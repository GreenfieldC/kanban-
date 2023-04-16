/* setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever'); */

/**
 * Loads all users from local storage
 */
const initResetPassword = async () => {
	await loadAllUsers();
	await loadUserIdResetPassword();
};

const checkResetPasswordForm = () => {
	const newPassword = document.getElementById('new-password').value;
	const newPasswordRepeat = document.getElementById('new-password-repeat').value;
	if (newPassword !== newPasswordRepeat) {
		showFeedbackMessage('reset-password-feedback');
		return;
	}

	allUsers[userIdResetPassword].password = newPassword; // hier muss noch die richtige ID rein
	saveAllUsers();
	alert('Password changed');
	showPasswordResetMessage();
	setTimeout(() => {
		forwardToLoginIn();
	}, 1000);
};

const showPasswordResetMessage = () => {
	let message = document.getElementById('feedback-message');
	message.classList.add('show-message');
};

/**
 * Loads the right user id from local storage for the password reset
 */
const loadUserIdResetPassword = async () => {
	if (localStorage.getItem('userIdResetPassword') === null) return;
	let userIdResetPasswordAsString = localStorage.getItem('userIdResetPassword');
	userIdResetPassword = +JSON.parse(userIdResetPasswordAsString);
	console.log(userIdResetPassword);
};
