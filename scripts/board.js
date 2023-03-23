'use strict';

const initBoard = async () => {
	await loadAllTasks();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderCards();
};

/**
 * Renders the cards in the board
 */
const renderCards = () => {
	renderToDoCards();
};

/**
 * Renders the cards in the todo column
 */
const renderToDoCards = () => {
	const todoContainer = document.getElementById('todo-container');
	todoContainer.innerHTML = '';

	allTasks.forEach((task, id) => {
		if (task.workflow === 'todo') {
			todoContainer.innerHTML += generateCardHtml(task.color, task.category, task.title, task.description, task.subtasks.length, id, task.priority);
			renderBadgesInCard(task, id);
			updateDoneSubtasks(id);
		}
	});
};

/**
 * Renders the badges in the card
 * @param {object} task
 * @param {number} id
 */
const renderBadgesInCard = (task, id) => {
	let badgesContainer = document.getElementById(`${id}.badges-container-board`);
	for (let i = 0; i < task.taskForce.length; i++) {
		renderFirstThreeBadges(badgesContainer, task, i);
		checkRenderNumberBadges(badgesContainer, i, id);
	}
};

/**
 * Renders the first three badges
 * @param {string} badgesContainer
 * @param {object} task
 * @param {number} i
 */
const renderFirstThreeBadges = (badgesContainer, task, i) => {
	if (i < 3) {
		const assignee = task.taskForce[i];
		badgesContainer.innerHTML += generateBadgeHtml(assignee.initials, assignee.color, assignee.name);
	}
};

/**
 * Renders a +badge if there are more than 3 assignees
 * @param {string} badgesContainer
 * @param {number} i
 * @param {number} id
 */
const checkRenderNumberBadges = (badgesContainer, i, id) => {
	if (i === 3) badgesContainer.innerHTML += generatePlusBadgeHtml(id);
};

const updateDoneSubtasks = (id) => {
	const doneSubtasks = allTasks[id].subtasks.filter((subtask) => subtask.check === true).length;
	const progress = document.getElementById(`${id}.progress`);
	progress.style.width = `${(doneSubtasks / allTasks[id].subtasks.length) * 100}%`;
	const textProgress = document.getElementById(`${id}.text-progress`);
	textProgress.innerHTML = `${doneSubtasks}/${allTasks[id].subtasks.length} Done`;
};
