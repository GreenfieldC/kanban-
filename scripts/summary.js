'use strict';

const initSummary = async () => {
	await renderSummary();
};

/**
 * renders the summary page
 */
const renderSummary = () => {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = generateSummaryHtml();
};
