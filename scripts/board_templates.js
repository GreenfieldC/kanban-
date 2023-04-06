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
	<div onclick="openCard(${id})" class="card" draggable="true" ondragstart="startDragging(${id})">
		<div class="colored-category-container category" style="background-color: ${color};" title="${category}">${truncateString(category, 15)}</div>
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
const generateProgressBarHtml = (id, location) => {
	return /*html*/ `
	<div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
		<div id="${id}.progress-${location}" class="progress-bar progress-bar-striped" style="width: 0%"></div>
	</div>
	<span id="${id}.text-progress-${location}" class="text-progress"></span>
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

/**
 * Generates the html for the card on display
 * @param {number} id
 * @returns {string} html
 */
const generateCardOnDisplayHtml = (id) => {
	return /*html*/ `
	<div class="position-relative">
		<img class="close-btn-card-on-display" onclick="closeCard()" src="./assets/icons/cancel.png" title="close card" alt="" />
		
		<div class="btn-container-card-on-display">
		
			<div onclick="saveEditedTask(${id})" title="save" id="ok-btn-on-display" type="button" class="btn btn-primary btn-ordinary edit-btn-on-display ok-btn d-none">
				<span>Save</span>
				<img src="./assets/icons/checkmark_addTask.png" />
			</div>

			<div id="on-display-btns" class="on-display-btns">
				<div onclick="openDeleteWindow(), closeChangeWorkflowStatus(event)" title="delete" id="" type="button" class="btn btn-primary btn-ordinary edit-btn-on-display delete-btn-on-display">
					<img class="delete-bin" src="./assets/icons/delete_bin.png" />
					<div class="delete-window-on-display d-none" id="delete-question-container">
						<div class="delete-window-on-display-text">Delete Task?</div>
						<div class="delete-window-on-display-btns">
							<div onclick="deleteTask(${id})" class="delete-window-on-display-btns-delete question-delete-hover" title="delete">Delete</div>
							<div onclick="closeDeleteWindow(event)" class="delete-window-on-display-btns-cancel question-delete-hover" title="cancel">Cancel</div>
						</div>
					</div>
				</div>

				<div onclick="openChangeWorkflowStatus(${id})" title="change workflow status" id="" type="button" class="btn btn-primary btn-ordinary edit-btn-on-display">
					<img src="./assets/icons/checkmark_addTask.png" />
					<div class="change-workflow-container d-none" id="change-workflow-container">
						<div id="todo-workflow-btn" onclick="changeWorkflowStatus(${id},'todo')" title="move to to do" class="workflow-change-hover">to do</div>
						<div id="in-progress-workflow-btn" onclick="changeWorkflowStatus(${id},'in-progress')" title="move to in progress" class="workflow-change-hover">in progress</div>
						<div id="awaiting-feedback-workflow-btn" onclick="changeWorkflowStatus(${id},'awaiting-feedback')" title="move to awaiting feedback" class="workflow-change-hover">awaiting feedback</div>
						<div id="done-workflow-btn" onclick="changeWorkflowStatus(${id},'done')" title="move to done" class="workflow-change-hover">done</div>
						
					</div>
				</div>

				<div title="edit task" onclick="editTask(${id});showRightBtnsOnDisplay('ok-btn-on-display')" id="" type="button" class="btn btn-primary btn-ordinary edit-btn-on-display">
					<img src="./assets/icons/pen_white.png" />
				</div>
			</div>
			
		</div>
		<div id="board-card-overlay" class="card card-overlay">
			<div class="heading-card-overlay">
				<div style="background-color: ${allTasks[id].color};" class="colored-category-container">${allTasks[id].category}</div>
			</div>
			<div class="card-body card-body-board">
				<h5 class="card-title card-title-overlay">${allTasks[id].title}</h5>
				<p class="card-text task-description-card task-description-card-overlay">${allTasks[id].description}</p>

				<div onclick="closeDeleteWindow(event); closeChangeWorkflowStatus(event)" class="date-priority-assigned-container-overlay">
					<div class="due-date-container-overlay">
						<span class="due-date-text">Due date:</span>
						<span class="due-date-numbers">${allTasks[id].dueDate}</span>
					</div>
					<div class="due-date-container-overlay">
						<span class="due-date-text">Priority:</span>
						<div class="priority-status-container" style="background-color: var(--${allTasks[id].priority}">
							<span class="priority-status">${allTasks[id].priority}</span>
							<img src="./assets/icons/${allTasks[id].priority}-icon-white.png" alt="" />
						</div>
					</div>

					<div class="subtasks-container-overlay">
						<div class="due-date-container-overlay">
							<span class="due-date-text">Subtasks:</span>
						</div>
						<div id="${id}.progress-bar-overlay" class="subtasks-container progress-bar-container-card">						
							none
						</div>
						<div id="subtasks-container-on-display"></div>
					</div>
					<div class="due-date-container-overlay">
						<span class="due-date-text">Assigned to:</span>
					</div>

					<div id="badges-card-on-display" class="badges-priority-container-card outer-badges-container-on-display">
						<div class="badges-container-card">
							<div class="inner-badge-container-on-display">
								<div class="initials-container initals-in-details-section" style="background-color: red">
									<span id="user-initals-details" class="user-initials user-initials-details">CG</span>
								</div>
								<span class="full-name-card-on-display">Christian Greenfield</span>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
	</div>
	
	`;
};

/**
 * Generates the badges on the card on display
 * @param {number} id
 * @returns {string} html
 */
const generateBadgesCardOnDisplayHtml = (id) => {
	let badges = '';
	for (let i = 0; i < allTasks[id].taskForce.length; i++) {
		badges += /*html*/ `
		<div class="inner-badge-container-on-display">
			<div class="initials-container initals-in-details-section" style="background-color: ${allTasks[id].taskForce[i].color}">
				<span id="user-initals-details" class="user-initials user-initials-details">${allTasks[id].taskForce[i].initials}</span>
			</div>
			<span class="full-name-card-on-display">${allTasks[id].taskForce[i].name}</span>
		</div>
		`;
	}
	return badges;
};
