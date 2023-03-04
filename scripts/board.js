'use strict';

const initBoard = async () => {
	await loadSideMenuHeader();
	document.getElementById('board-btn').classList.add('active');
};
