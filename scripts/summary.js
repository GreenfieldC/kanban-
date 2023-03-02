'use strict';

const initSummary = async () => {
	await renderSummary();
};

/**
 * renders the summary page
 */
const renderSummary = () => {
	setInnerHtmlById('content', '');
	setInnerHtmlById('content', generateSummaryHtml());
};
