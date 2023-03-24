'use strict';

let currentDraggedCard;

const initBoard = async () => {
	await loadAllTasks();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderCards();
};

/**
 * Renders the cards in the board
 */
const renderCards = () => {
	renderCardsOf('todo', 'todo');
	renderCardsOf('in-progress', 'in-progress');
	renderCardsOf('awaiting-feedback', 'awaiting-feedback');
	renderCardsOf('done', 'done');
};

/**
 * Renders the cards of a specific workflow
 * @param {string} container
 * @param {string} workflow
 */
const renderCardsOf = (container, workflow) => {
	const cardsContainer = document.getElementById(container);
	cardsContainer.innerHTML = '';

	const cards = allTasks.filter((task) => task.workflow === workflow);

	sortAccordingToPriority(cards);

	cards.forEach((task) => {
		cardsContainer.innerHTML += generateCardHtml(task.color, task.category, task.title, task.description, task.taskIndex, task.priority);
		checkRenderProgressBar(task.taskIndex, task.subtasks.length);
		renderBadgesInCard(task, task.taskIndex);
		updateDoneSubtasks(task.taskIndex, task.subtasks.length);
	});
	saveAllTasks();
};

/**
 * Sorts the cards according to their priority
 * @param {object} cards
 */
const sortAccordingToPriority = (cards) => {
	cards.sort((a, b) => {
		if ((a.priority === 'urgent' && b.priority === 'low') || (a.priority === 'urgent' && b.priority === 'medium')) return -1;
		if ((a.priority === 'low' && b.priority === 'urgent') || (a.priority === 'medium' && b.priority === 'urgent')) return 1;
		return 0;
	});
};

/**
 * Renders the progress bar in the card if there are subtasks
 * @param {number} id
 * @param {number} amountSubtasks
 */
const checkRenderProgressBar = (id, amountSubtasks) => {
	if (amountSubtasks > 0) {
		const progressBarContainer = document.getElementById(`${id}.progress-bar-container`);
		progressBarContainer.innerHTML = generateProgressBarHtml(id);
	}
};

/**
 * Renders the badges in the card
 * @param {object} task
 * @param {number} id
 */
const renderBadgesInCard = (task, id) => {
	const badgesContainer = document.getElementById(`${id}.badges-container-board`);
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

/**
 * Updates the progress bar in the card if there are subtasks
 * @param {number} id
 * @param {number} amountSubtasks
 */
const updateDoneSubtasks = (id, amountSubtasks) => {
	if (amountSubtasks > 0) {
		const doneSubtasks = allTasks[id].subtasks.filter((subtask) => subtask.check === true).length;
		const progress = document.getElementById(`${id}.progress`);
		progress.style.width = `${(doneSubtasks / allTasks[id].subtasks.length) * 100}%`;
		const textProgress = document.getElementById(`${id}.text-progress`);
		textProgress.innerHTML = `${doneSubtasks}/${allTasks[id].subtasks.length} Done`;
	}
};

/**
 * Starts the dragging of a card
 * @param {number} id
 */
const startDragging = (id) => {
	currentDraggedCard = id;
	console.log('start dragging', id);
};

/**
 * Allows the card to be dropped
 * @param {obj} ev
 */
const allowDrop = (ev) => {
	ev.preventDefault();
};

/**
 * Moves the card to the new column and updates the workflow
 * @param {string} workflow
 */
const moveTo = (workflow) => {
	console.log('move to', workflow);
	allTasks[currentDraggedCard].workflow = workflow;
	renderCards();
};

/**
 * Searches for the input in the cards and shows only the cards that contain the input
 */
const search = () => {
	const input = document.getElementById('search');
	const filter = input.value.toUpperCase();
	const cards = document.getElementsByClassName('card');

	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		const title = card.getElementsByClassName('category')[0];
		const description = card.getElementsByClassName('task-description-card')[0];
		if (titleFound(title, filter) || descriptionFound(description, filter)) card.style.display = '';
		if (titleNotFound(title, filter) && descriptionNotFound(description, filter)) card.style.display = 'none';
	}
};

/**
 * Returns true if the title contains the filter
 * @param {string} title
 * @param {string} filter
 * @returns
 */
const titleFound = (title, filter) => {
	return title.innerHTML.toUpperCase().indexOf(filter) > -1;
};

/**
 * Returns true if the title does not contain the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const titleNotFound = (title, filter) => {
	return title.innerHTML.toUpperCase().indexOf(filter) === -1;
};

/**
 * Returns true if the description contains the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const descriptionFound = (description, filter) => {
	return description.innerHTML.toUpperCase().indexOf(filter) > -1;
};

/**
 * Returns true if the description does not contain the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const descriptionNotFound = (description, filter) => {
	return description.innerHTML.toUpperCase().indexOf(filter) === -1;
};
