'use strict';

const initHelp = async () => {
	await loadAllUsers();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
};
