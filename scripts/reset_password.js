/* setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever'); */

/**
 * Loads all users from local storage
 */
const initResetPassword = async () => {
	await loadAllUsers();
	await loadUserIdResetPassword();
	console.log(allUsers);
	console.log(userIdResetPassword);
};

const checkResetPasswordForm = async () => {
	const newPassword = document.getElementById('new-password').value;
	const newPasswordRepeat = document.getElementById('new-password-repeat').value;
	if (newPassword !== newPasswordRepeat) {
		alert('Passwords do not match');
		return;
	}

	allUsers[userIdResetPassword].password = newPassword;
	await saveAllUsers();
	alert('Password changed');
	setTimeout(() => {
		forwardToLoginIn();
	}, 2000);
};

/**
 * Loads the right user id from local storage for the password reset
 */
const loadUserIdResetPassword = async () => {
	if (localStorage.getItem('userIdResetPassword') === null) return;
	let userIdResetPasswordAsString = localStorage.getItem('userIdResetPassword');
	userIdResetPassword = JSON.parse(userIdResetPasswordAsString);
};
