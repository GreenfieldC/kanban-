/**
 * Toggle for the drop down list of the assigned to in 'Edit Task' section
 */
const toggleAssignedToDropDown = () => {
	let dropDownAssignedToEditTask = document.getElementById('drop-down-list-assigned-to-edit-task');
	let inputAssignedToEditTask = document.getElementById('assign-input-edit-task');
	dropDownAssignedToEditTask.classList.toggle('d-block');
	inputAssignedToEditTask.classList.toggle('input-toggle');
};

/**
 * Shows the right buttons on the card on display
 * @param {string} btnId
 */
const showRightBtnsOnDisplay = (btnId) => {
	showBtnContainerOnDisplay(btnId);
	hideBtnContainerOnDisplay();
};

/**
 * Shows the button container on display
 * @param {*} btnId
 */
const showBtnContainerOnDisplay = (btnId) => {
	let btn = document.getElementById(btnId);
	btn.classList.remove('d-none');
};

/**
 * Hides the button container on display
 * when edditing a task
 *
 */
const hideBtnContainerOnDisplay = () => {
	let btn = document.getElementById('on-display-btns');
	btn.classList.add('d-none');
};

/**
 * Saves the edited task and renders the cards in the board
 * @param {number} taskId
 */
const saveEditedTask = async (taskId) => {
	let title = document.getElementById('edit-task-title').value;
	let description = document.getElementById('edit-task-description').value;
	let dueDate = document.getElementById('due-date-edit-task-input').value;

	allTasks[taskId].title = title;
	allTasks[taskId].description = description;
	allTasks[taskId].dueDate = dueDate;

	//BUG,Hier fehlen das Feedback!

	if (noInput(title, description, taskId)) {
		showFeedbackNoInput(title, description, taskId);
		return;
	}

	await await save();
	renderCards((subtaskOnDisplay = false));
	openCard(taskId);
};

const noInput = (title, description, taskIndex) => {
	return title == '' || description == '' || !allTasks[taskIndex].taskForce.length;
};

const showFeedbackNoInput = (title, description, taskIndex) => {
	let titleFeedbackEditTask = document.getElementById('required-edit-title');
	let descriptionFeedbackEditTask = document.getElementById('required-edit-description');
	let assignedToFeedbackEditTask = document.getElementById('required-edit-assigned-to');
	if (title == '') titleFeedbackEditTask.style.opacity = 1;
	if (description == '') descriptionFeedbackEditTask.style.opacity = 1;
	if (!allTasks[taskIndex].taskForce.length) assignedToFeedbackEditTask.style.opacity = 1;
};

/**
 * Deletes the task and renders the cards in the board
 * @param {number} taskId
 */
const deleteTask = async (taskId) => {
	allTasks.splice(taskId, 1);
	await updateTaskIndex();
	await save();
	closeCard();
	renderCards((subtaskOnDisplay = false));
};

/**
 * Opens the delete window
 */
const openDeleteWindow = () => {
	let deleteQuestionContainer = document.getElementById('delete-question-container');
	deleteQuestionContainer.classList.remove('d-none');
};

/**
 * Closes the delete window
 * @param {obj} event
 */
const closeDeleteWindow = (event) => {
	event.stopPropagation();
	let deleteQuestionContainer = document.getElementById('delete-question-container');
	deleteQuestionContainer.classList.add('d-none');
};

/**
 * Changes the workflow status of the task and renders the cards in the board
 * @param {number} taskId
 * @param {string} status
 */
const changeWorkflowStatus = async (taskId, status) => {
	allTasks[taskId].workflow = status;
	renderCards((subtaskOnDisplay = false));
	subtaskOnDisplay = true;
	deleteAllHighlightCurrentWorkflowStatus();
	highlightCurrentWorkflowStatus(taskId);
	closeChangeWorkflowStatus(event);
	await save();
};

/**
 * Opens the change workflow status window
 * @param {number} taskId
 */
const openChangeWorkflowStatus = (taskId) => {
	let container = document.getElementById('change-workflow-container');
	container.classList.remove('d-none');
	highlightCurrentWorkflowStatus(taskId);
};

/**
 * Closes the change workflow status window
 * @param {obj} event
 */
const closeChangeWorkflowStatus = (event) => {
	event.stopPropagation();
	let container = document.getElementById('change-workflow-container');
	container.classList.add('d-none');
};

/**
 * Highlights the current workflow status of the task
 * @param {number} taskId
 */
const highlightCurrentWorkflowStatus = (taskId) => {
	let workflowStatus = allTasks[taskId].workflow;
	let workflowStatusBtn = document.getElementById(`${workflowStatus}-workflow-btn`);
	workflowStatusBtn.classList.add('workflow-status-btn-active');
};

/**
 * Deletes all the highlights of the workflow status buttons
 */
const deleteAllHighlightCurrentWorkflowStatus = () => {
	let workflowStatusBtn = document.querySelectorAll('div[id*="-workflow-btn"]');
	workflowStatusBtn.forEach((btn) => {
		btn.classList.remove('workflow-status-btn-active');
	});
};
