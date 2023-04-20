/**
 * Loads all users from local storage
 */
const initResetPassword = async () => {
	await load();
	await loadUserIdResetPassword();
};

/**
 * Checks the reset password form
 * @returns
 */
const checkResetPasswordForm = async () => {
	const newPassword = document.getElementById('new-password').value;
	const newPasswordRepeat = document.getElementById('new-password-repeat').value;
	if (newPassword !== newPasswordRepeat) {
		showFeedbackMessage('reset-password-feedback');
		return;
	}

	allUsers[userIdResetPassword].password = newPassword; // hier muss noch die richtige ID rein
	await save();
	alert('Password changed');
	showPasswordResetMessage();
	setTimeout(() => {
		forwardToLoginIn();
	}, 1000);
};

/**
 * Shows the feedback message
 */
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
};
