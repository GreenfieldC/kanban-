/**
 *
 * @param {string} color
 * @param {string} category
 * @param {string} title
 * @param {string} description
 * @param {number} amountSubtasks
 * @param {number} id
 * @param {string} priority
 * @returns html for a card
 */
const generateCardHtml = (color, category, title, description, amountSubtasks, id, priority) => {
	return /*html*/ `
	<div class="card">
		<div class="colored-category-container" style="background-color: ${color};">${category}</div>
		<div class="card-body card-body-board">
			<h5 class="card-title">${title}</h5>
			<p class="card-text task-description-card">${truncateString(description, 30)}</p>
			<div class="progress-bar-container-card">
				<div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
					<div class="progress-bar progress-bar-striped" style="width: 10%"></div>
				</div>
				<span class="text-progress">1/${amountSubtasks} Done</span>
			</div>
			<div  class="badges-priority-container-card">
				<div id="${id}.badges-container-board" class="badges-container-card in-board-badges-container">
				</div>
				<img src="./assets/icons/${priority}-icon.png" alt="${priority}" />
			</div>
		</div>
	</div>
	`;
};

/**
 *
 * @param {string} initials
 * @param {string} color
 * @returns html for a badge
 */
const generateBadgeHtml = (initials, color) => {
	return /*html*/ `
	<div class="initials-container initals-in-details-section" style="background-color: ${color}">
		<span id="user-initals-details" class="user-initials user-initials-details">
			${initials}
		</span>
	</div>
	`;
};

/**
 *
 * @param {number} id
 * @returns html for a +badge
 */
const generatePlusBadgeHtml = (id) => {
	return /*html*/ `
	<div class="initials-container initals-in-details-section" style="background-color: var(--dark-blue)">
		<span id="user-initals-details" class="user-initials user-initials-details">
			+${allTasks[id].taskForce.length - 3}
		</span>
	</div>
	`;
};

/**
 * Shortens a string to a given length and adds '...' at the end
 * @param {string} str
 * @param {number} maxlength
 * @returns string
 */
const truncateString = (str, maxlength) => {
	if (str.length <= maxlength) {
		return str;
	}
	return str.slice(0, maxlength) + '...';
};
