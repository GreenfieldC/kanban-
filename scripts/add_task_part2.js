/*
!Due Date  */

const resetDueDateToToday = () => {
	let dueDateInput = document.getElementById('due-date-add-task-input');
	dueDateInput.value = currentDate();
};

/*
!Priority Buttons  */

/**
 * Shows selected priority with color on button and sets priority
 * @param {string} priority
 * @param {string} color
 */
const selectPriority = (location, priority, color, cardId) => {
	resetColorAllPriorityBtns(location);
	visuallySelectPriority(location, priority, color);
	taskPriority = priority;

	if (cardId == undefined) return;
	if (subtaskOnDisplay) allTasks[cardId].priority = priority;
};

/**
 * Resets the color of all priority buttons
 */
const resetColorAllPriorityBtns = (location) => {
	let btns = ['urgent', 'medium', 'low'];
	btns.forEach((btn) => {
		const prioBtn = document.getElementById(`select-${btn}-${location}`);
		prioBtn.style.backgroundColor = '';
		prioBtn.style.boxShadow = '';
		const text = document.getElementById(`${btn}-text-${location}`);
		text.style.color = '';
		const svg = document.getElementById(`${btn}-svg-${location}`);
		svg.style.color = '';
	});
};

/**
 * Adds color to selected priority button
 * @param {string} priority
 * @param {string} color
 */
const visuallySelectPriority = (location, priority, color) => {
	const btn = document.getElementById(`select-${priority}-${location}`);
	btn.style.backgroundColor = color;
	btn.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
	const text = document.getElementById(`${priority}-text-${location}`);
	text.style.color = '#ffffff';
	const svg = document.getElementById(`${priority}-svg-${location}`);
	svg.style.color = '#ffffff';
};

/**
 * Adds new subtask to subtask list
 * @returns {boolean} true if subtask input is empty
 */
const addSubTask = () => {
	let subTask = document.getElementById('subtasks-input');

	if (checkInputSubTaskEmpty(subTask)) return;
	subtasks.push(subTaskObject(subTask.value));
	renderNewSubTasks(subTask.value);
	document.getElementById('subtasks-input').value = '';
};

/**
 *
 * @param {string} subTask
 * @returns {boolean} true if subtask input is empty
 */
const checkInputSubTaskEmpty = (subTask) => {
	if (subTask.value == '') {
		subTask.value = 'No empty subtasks allowed';
		setTimeout(() => {
			subTask.value = '';
		}, 2000);
		return true;
	}
};

/**
 * @param {string} subtask
 * @returns {object} subtask object
 */
const subTaskObject = (subtask) => {
	let subTaskObject = {
		title: subtask,
		check: false,
	};
	return subTaskObject;
};

/**
 * Generates subtask element
 */
const renderNewSubTasks = () => {
	subTaskList.innerHTML = '';
	subtasks.forEach((subTask, subtaskId) => {
		let cardId = 0;
		generateSubTask(subTask.title, cardId, subtaskId, subTaskList);
	});
};

/**
 * Takes subtask of subtask list and generates subtask element
 * @param {number} id
 */
const deleteSubtask = async (cardId, subtaskId) => {
	if (!subtaskOnDisplay) {
		subtasks.splice(subtaskId, 1);
		renderNewSubTasks();
		/* updateDoneSubtasks(allTasks[cardId].taskIndex, allTasks[cardId].subtasks.length, 'card'); */
	}

	if (inContactsAddTask) return;

	if (!subtaskOnDisplay && !addTaskMainSite) {
		updateDoneSubtasks(allTasks[cardId].taskIndex, allTasks[cardId].subtasks.length, 'card');
	}

	if (subtaskOnDisplay) {
		allTasks[cardId].subtasks.splice(subtaskId, 1);
		renderSubtasksOnDisplay(cardId);
		updateDoneSubtasks(allTasks[cardId].taskIndex, allTasks[cardId].subtasks.length, 'card-on-display');
		renderCards((subtaskOnDisplay = false));
		subtaskOnDisplay = true;
	}
	await save();
};

/**
 * Resets the add task formular to default
 */
const clearAddTaskFormular = () => {
	clearRequiredValues();
	clearInputfields();
	renderNewSubTasks();
	renderBadgesAddTask();
	cancelNewCategory();
	removeCheckMarksFromAssignedTo();
	addCheckKeyToAllUsers();
	resetColorAllPriorityBtns('add-task');
	resetDueDateToToday();
	dueDate = currentDate();
	hideInvalidFeedback();
};

/**
 * Clears all required fields
 */
const clearRequiredValues = () => {
	taskTitle = '';
	taskDescription = '';
	categoryTitle = '';
	selectedColor = '';
	taskForce = [];
	taskPriority = '';
	subtasks = [];
};

/**
 * Clears input fields
 */
const clearInputfields = () => {
	addTaskTitle.value = '';
	addTaskDescription.value = '';
	subTaskInput.value = '';
};

/**
 * Removes checkmarks from assigned to dropdown
 */
const removeCheckMarksFromAssignedTo = () => {
	let checkMarks = document.querySelectorAll('[id*=".\\-coworker-checkbox"]');
	checkMarks.forEach((checkMark) => {
		checkMark.checked = false;
	});
};

/**
 * Pushes new task to allTasks json
 * @param {string} workflow is set to 'todo', 'awaiting feedback 'in progress' or 'done'
 * depending on with what btn the task was created
 */
const createTask = async (workflow) => {
	taskTitle = addTaskTitle.value;
	taskDescription = addTaskDescription.value;
	dueDate = document.getElementById('due-date-add-task-input').value;
	let task = {
		taskIndex: !allTasks.length ? 0 : allTasks.length - 1,
		title: taskTitle,
		description: taskDescription,
		category: categoryTitle,
		color: selectedColor,
		taskForce: taskForce,
		priority: taskPriority,
		subtasks: subtasks,
		dueDate: dueDate,
		workflow: workflow,
	};

	if (noValidInput()) {
		showInvalidFeedback();
		return;
	}
	allTasks.push(task);
	await updateTaskIndex();

	await save();

	clearAddTaskFormular();
	hideInvalidFeedback();
	showTaskAddedFeedback();
	if (addTaskMainSite) return;
	renderCards();
};

/**
 * Updates the taskIndex of all tasks
 */
const updateTaskIndex = async () => {
	allTasks.forEach((task, index) => {
		task.taskIndex = index;
	});
};

/**
 * @returns {boolean} true if no valid input
 */
const noValidInput = () => {
	return taskTitle == '' || taskDescription == '' || categoryTitle == '' || selectedColor == '' || taskForce.length == 0 || taskPriority == '';
};

/**
 * Shows invalid feedback
 */
const showInvalidFeedback = () => {
	if (taskTitle == '') requiredTitle.style.opacity = 1;
	if (taskDescription == '') requiredDescription.style.opacity = 1;
	if (categoryTitle == '') requiredCategory.style.opacity = 1;
	if (taskForce.length == 0) requiredAssignedTo.style.opacity = 1;
	if (taskPriority == '') requiredPriority.style.opacity = 1;
};

/**
 * Hides invalid feedback
 */
const hideInvalidFeedback = () => {
	requiredTitle.style.opacity = 0;
	requiredDescription.style.opacity = 0;
	requiredCategory.style.opacity = 0;
	requiredAssignedTo.style.opacity = 0;
	requiredPriority.style.opacity = 0;
};

const showTaskAddedFeedback = () => {
	let message = document.getElementById('task-added-feedback');
	message.classList.add('show-feedback-add-task');
	setTimeout(() => {
		message.classList.remove('show-feedback-add-task');
	}, 2000);
};

dropDownCategoryList.addEventListener('click', (event) => {
	event.stopPropagation();
});

categoryBtn.addEventListener('click', (event) => {
	event.stopPropagation();
});

assignedToInput.addEventListener('click', (event) => {
	event.stopPropagation();
});

assignedInput.addEventListener('click', (event) => {
	event.stopPropagation();
});

dropDownAssignedToList.addEventListener('click', (event) => {
	event.stopPropagation();
});
