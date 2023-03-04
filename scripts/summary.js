'use strict';

const initSummary = async () => {
	await loadSideMenuHeader();
	document.getElementById('summary-btn').classList.add('active');
};
