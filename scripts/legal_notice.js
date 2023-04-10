async function initLegalNotice() {
	await loadAllUsers();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
}
