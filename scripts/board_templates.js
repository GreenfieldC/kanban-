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
const generateCardHtml = (color, category, title, description, id, priority) => {
	return /*html*/ `
	<div class="card" draggable="true" ondragstart="startDragging(${id})">
		<div class="colored-category-container" style="background-color: ${color};" title="${category}">${truncateString(category, 15)}</div>
		<div class="card-body card-body-board">
			<h5 class="card-title" title="${title}" >${truncateString(title, 15)}</h5>
			<p class="card-text task-description-card">${truncateString(description, 30)}</p>
			<div id="${id}.progress-bar-container" class="progress-bar-container-card">
				
			</div>
			<div  class="badges-priority-container-card">
				<div id="${id}.badges-container-board" class="badges-container-card in-board-badges-container">
				</div>
				<img src="./assets/icons/${priority}-icon.png" alt="${priority}" title="priority is ${priority}"/>
			</div>
		</div>
	</div>
	`;
};

/**
 * Generates the html for the progress bar
 * @param {number} id
 */
const generateProgressBarHtml = (id) => {
	return /*html*/ `
	<div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
		<div id="${id}.progress" class="progress-bar progress-bar-striped" style="width: 0%"></div>
	</div>
	<span id="${id}.text-progress" class="text-progress"></span>
	`;
};

/**
 *
 * @param {string} initials
 * @param {string} color
 * @returns html for a badge
 */
const generateBadgeHtml = (initials, color, name) => {
	return /*html*/ `
	<div class="initials-container initals-in-details-section" style="background-color: ${color}" title="${name}">
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