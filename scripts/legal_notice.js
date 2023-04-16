async function initLegalNotice() {
	await includeHTML();
	highlightSideMenuButton('legal-notice');
	await loadAllUsers();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
}
