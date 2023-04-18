'use strict';

const initHelp = async () => {
	await includeHTML();
	await load();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
};
