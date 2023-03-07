'use strict';

const initBoard = async () => {
	await loadSideMenuHeader();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	document.getElementById('board-btn').classList.add('active');
	document.getElementById('bottom-board-btn').classList.add('active');
};
