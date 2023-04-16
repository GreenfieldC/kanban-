'use strict';

const initHelp = async () => {
	await includeHTML();
	await loadAllUsers();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
};
