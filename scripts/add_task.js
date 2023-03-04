'use strict';

const initAddTask = async () => {
	await loadSideMenuHeader();
	document.getElementById('add-task-btn').classList.add('active');
	document.getElementById('bottom-add-task-btn').classList.add('active');
};
