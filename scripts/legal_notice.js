async function initLegalNotice() {
	await includeHTML();
	highlightSideMenuButton('legal-notice');
	await load();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
}
