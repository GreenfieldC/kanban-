'use strict';

const initBoard = async () => {
	await loadAllTasks();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderCards();
};

const renderCards = () => {
	renderToDoCards();
};

const renderToDoCards = () => {
	const todoContainer = document.getElementById('todo-container');
	todoContainer.innerHTML = '';
	allTasks.forEach((task) => {
		if (task.workflow === 'todo') {
			todoContainer.innerHTML += generateCardHtml(task.color, task.category, task.title, task.description, task.subtasks.length, task.priority);
		}
	});
};

const generateCardHtml = (color, category, title, description, amountSubtasks, priority) => {
	return /*html*/ `
	<div class="card">
		<div class="colored-category-container" style="background-color: ${color};">${category}</div>
		<div class="card-body card-body-board">
			<h5 class="card-title">${title}</h5>
			<p class="card-text task-description-card">${truncateString(description, 70)}</p>
			<div class="progress-bar-container-card">
				<div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
					<div class="progress-bar progress-bar-striped" style="width: 10%"></div>
				</div>
				<span class="text-progress">1/${amountSubtasks} Done</span>
			</div>
			<div id="badges-container-board" class="badges-priority-container-card">
				<div class="badges-container-card in-board-badges-container">
					<div class="initials-container initals-in-details-section" style="background-color: red">
						<span id="user-initals-details" class="user-initials user-initials-details">CG</span>
					</div>
					<div class="initials-container initals-in-details-section" style="background-color: red">
						<span id="user-initals-details" class="user-initials user-initials-details">CG</span>
					</div>
					<div class="initials-container initals-in-details-section" style="background-color: red">
						<span id="user-initals-details" class="user-initials user-initials-details">CG</span>
					</div>
				</div>
				<img src="./assets/icons/${priority}-icon.png" alt="${priority}" />
			</div>
		</div>
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

/* const generateBadgesForCards = () => {
	const badgesContainer = document.getElementById('badges-container-board');
	badgesContainer.innerHTML = '';
	allTasks.forEach((task) => {
		if (task.taskforce < 3) {
			badgesContainer.innerHTML += generateBadgeHtml(task.taskforce);
		}
	});
}; */
