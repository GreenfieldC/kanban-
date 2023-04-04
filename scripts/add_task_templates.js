/*
!===Select Category ===*/

const renderNewCategoryElementInList = () => {
	const html = /*html*/ `
	<div onclick="newCategoryInput()" id="new-category" class="category-box justify-content-start">
		<label role="button" class="form-check-label m-0">New Category</label>
	</div>`;

	dropDownCategoryList.insertAdjacentHTML('afterbegin', html);
};

/**
 * Generates the html for the elements of category list
 */
const generatesCategoryListHtml = (id, title, color) => {
	const html =
		/*html*/
		`<div onclick="chooseCategory(${id})" id="${id}.category-box" class="category-box justify-content-start">
			<label role="button" id="${id}.category" class="form-check-label m-0">${title}</label>
			<div class="category-badge-container">
				<div id="${id}.category-color" class="category-badge" style="background-color: ${color}"></div>
			</div>
		</div>`;
	dropDownCategoryList.insertAdjacentHTML('beforeend', html);
};

/*
!===Assigned To ===*/

/**
 * Generates the html for the elements of assigned to list
 * @param {number} id of user in allUsers json
 * @param {string} name of user
 */
const generatesAssignedToListWithUsers = (id, name, location) => {
	const html = /*html*/ `
    <div onclick="selectToggle(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container ">
        <label id="coworker-name" class="form-check-label m-0" for="${id}.-coworker-check">${name}</label>
        <input class="form-check-input checkbox" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	location.insertAdjacentHTML('beforeend', html);
};

/**
 *
 * @param {number} id of logged in user
 * @param {string} name
 */
const generatesAssignedToListElementForLoggedInUser = (id, name, location) => {
	const html = /*html*/ `
    <div onclick="selectToggle(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container">
        <label id="coworker-name" class="form-check-label m-0" for="${id}.-coworker-check" title="${name}">You</label>
        <input class="form-check-input checkbox" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	location.insertAdjacentHTML('afterbegin', html);
};

/**
 * Generates html for the badges of assigned to/task force
 * @param {string} name
 * @param {string} color
 */
const generateBadgesForAssignedTo = (name, color, initials) => {
	const html = /*html*/ `
	<div title="${name}" class="initials-container" style="background-color: ${color}">
		<span class="user-initials">${initials}</span>
	</div>
	`;
	assignedToBadges.insertAdjacentHTML('afterbegin', html);
};

/*
!===Subtasks ===*/
/**
 * Generates the html for the elements of subtasks list
 * @param {string} title
 * @param {number} cardId
 * @param {number} subtaskId
 * @param {string} location of the subtask (card on display, addTask)
 */
const generateSubTask = (title, cardId, subtaskId, location) => {
	const html = /*html*/ `
	<div id="${subtaskId}.subtask" class="checkbox-task-container">
		<input disabled="true" onclick="toggleCheckSubtask(${cardId}, ${subtaskId})" class="form-check-input" type="checkbox" value="" id="${cardId}-${subtaskId}-checkbox-subtask" autocomplete="off" />
		<label class="form-check-label m-0" for="${cardId}-${subtaskId}-checkbox-subtask">${title}</label>
		<img id="subtask" onclick="deleteSubtask(${cardId},${subtaskId})" src="./assets/icons/delete.png" alt="delete" class="delete-icon subtask-delete-img" />
	</div>
	`;
	location.insertAdjacentHTML('beforeend', html);

	let checkboxSubtask = document.getElementById(`${cardId}-${subtaskId}-checkbox-subtask`);
	if (!subtaskOnDisplay) return; // if the subtask is not on display, do not enable the checkbox

	enableCheckboxesInCardsOnDisplay(checkboxSubtask);
	addCheckMark(cardId, subtaskId, checkboxSubtask);
};

/**
 * Enables the checkboxes in the cards on display
 * @param {string} checkboxSubtask
 */
const enableCheckboxesInCardsOnDisplay = (checkboxSubtask) => {
	if (subtaskOnDisplay) {
		checkboxSubtask.disabled = false;
	}
};

/**
 * Adds a checkmark to the subtask if it is checked
 * @param {number} cardId
 * @param {number} subtaskId
 * @param {string} checkboxSubtask
 */
const addCheckMark = (cardId, subtaskId, checkboxSubtask) => {
	if (allTasks[cardId].subtasks[subtaskId].check) {
		checkboxSubtask.checked = true;
	}
};

const generateEditTaskHtml = (cardId) => {
	return /*html*/ `
	<form novalidate>
			<div class="add-task-container">
				<div class="add-task-top">
					<!-- Enter title -->
					<div class="form-group">
						<label for="formGroupExampleInput">Title</label>
						<input value="${allTasks[cardId].title}" type="text" class="form-control" id="add-task-title" placeholder="Enter a title" autocomplete="off" />
						<div id="required-title" class="invalid-feedback">This is a required field</div>
					</div>

					<!-- Enter a Description -->
					<div class="form-group">
						<label for="exampleFormControlTextarea1">Description</label>
						<textarea class="form-control" id="add-task-description" rows="3" placeholder="Enter a description">${allTasks[cardId].description}</textarea>
						<div id="required-description" class="invalid-feedback">This is a required field</div>
					</div>
				</div>

				<div class="add-task-bottom">
					<!-- Due date -->
					<div class="form-group">
						<label for="exampleFormControlSelect1">Due date</label>
						<input value="${allTasks[cardId].dueDate}" id="due-date-add-task-input-edit" min="2023-01-01" class="form-control" type="date" name="date" />
						<div id="required-dueDate" class="invalid-feedback">This is a required field</div>
					</div>

					<!-- Priority -->
					<div class="form-group">
						<label for="exampleFormControlSelect1">Prio</label>
						<div class="container prio-btns-container p-0">
							<button onclick="selectPriority('urgent', '#ff3d00')" id="select-urgent" type="button" class="btn btn-outline-secondary even-width prio-btn">
								<div class="inner-btn-container">
									<span id="urgent-text" class="prio-text">Urgent</span>
									<svg id="urgent-svg" class="urgent-svg" width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M19.4043 14.755C19.1696 14.7554 18.9411 14.6805 18.7522 14.5414L10.5001 8.45824L2.24809 14.5414C2.13224 14.627 2.00066 14.6889 1.86086 14.7237C1.72106 14.7584 1.57577 14.7653 1.43331 14.7439C1.29084 14.7226 1.15397 14.6734 1.03053 14.5992C0.907083 14.525 0.799474 14.4272 0.713845 14.3114C0.628216 14.1957 0.566244 14.0642 0.531467 13.9245C0.49669 13.7848 0.48979 13.6396 0.51116 13.4973C0.554319 13.2097 0.71001 12.9511 0.943982 12.7783L9.84809 6.20786C10.0368 6.06826 10.2654 5.99292 10.5001 5.99292C10.7349 5.99292 10.9635 6.06826 11.1522 6.20786L20.0563 12.7783C20.2422 12.9153 20.3801 13.1074 20.4503 13.3272C20.5204 13.5471 20.5193 13.7835 20.4469 14.0027C20.3746 14.2219 20.2349 14.4126 20.0476 14.5477C19.8604 14.6828 19.6352 14.7554 19.4043 14.755Z"
											fill="currentColor"
										/>
										<path
											d="M19.4043 9.00581C19.1696 9.00621 18.9411 8.93136 18.7522 8.79226L10.5002 2.7091L2.2481 8.79226C2.01412 8.96507 1.72104 9.03793 1.43331 8.9948C1.14558 8.95167 0.886785 8.7961 0.713849 8.5623C0.540914 8.3285 0.468006 8.03563 0.511165 7.74811C0.554324 7.4606 0.710015 7.20199 0.943986 7.02919L9.8481 0.45871C10.0368 0.319119 10.2654 0.243774 10.5002 0.243774C10.7349 0.243774 10.9635 0.319119 11.1522 0.45871L20.0563 7.02919C20.2422 7.1661 20.3801 7.35822 20.4503 7.5781C20.5204 7.79797 20.5193 8.03438 20.447 8.25356C20.3746 8.47274 20.2349 8.6635 20.0476 8.79859C19.8604 8.93368 19.6352 9.0062 19.4043 9.00581Z"
											fill="currentColor"
										/>
									</svg>
								</div>
							</button>
							<button onclick="selectPriority('medium', '#ffa800')" id="select-medium" type="button" class="btn btn-outline-secondary even-width prio-btn">
								<div class="inner-btn-container">
									<span id="medium-text" class="prio-text">Medium</span>
									<svg id="medium-svg" class="medium-svg" width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M18.9041 8.22552H1.09589C0.805242 8.22552 0.526498 8.10922 0.320979 7.90221C0.11546 7.6952 0 7.41443 0 7.12167C0 6.82891 0.11546 6.54814 0.320979 6.34113C0.526498 6.13412 0.805242 6.01782 1.09589 6.01782H18.9041C19.1948 6.01782 19.4735 6.13412 19.679 6.34113C19.8845 6.54814 20 6.82891 20 7.12167C20 7.41443 19.8845 7.6952 19.679 7.90221C19.4735 8.10922 19.1948 8.22552 18.9041 8.22552Z"
											fill="currentColor"
										/>
										<path
											d="M18.9041 2.98223H1.09589C0.805242 2.98223 0.526498 2.86594 0.320979 2.65892C0.11546 2.45191 0 2.17114 0 1.87839C0 1.58563 0.11546 1.30486 0.320979 1.09785C0.526498 0.890834 0.805242 0.774536 1.09589 0.774536L18.9041 0.774536C19.1948 0.774536 19.4735 0.890834 19.679 1.09785C19.8845 1.30486 20 1.58563 20 1.87839C20 2.17114 19.8845 2.45191 19.679 2.65892C19.4735 2.86594 19.1948 2.98223 18.9041 2.98223Z"
											fill="currentColor"
										/>
									</svg>
								</div>
							</button>
							<button onclick="selectPriority('low','#7ae229')" id="select-low" type="button" class="btn btn-outline-secondary even-width prio-btn">
								<div class="inner-btn-container">
									<span id="low-text" class="prio-text">Low</span>
									<svg id="low-svg" class="low-svg" width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M10.5 9.00614C10.2654 9.00654 10.0369 8.9317 9.84802 8.79262L0.944913 2.22288C0.829075 2.13733 0.731235 2.02981 0.65698 1.90647C0.582724 1.78313 0.533508 1.64638 0.51214 1.50404C0.468986 1.21655 0.541885 0.923717 0.714802 0.689945C0.887718 0.456173 1.14649 0.300615 1.43418 0.257493C1.72188 0.21437 2.01493 0.287216 2.24888 0.460004L10.5 6.54248L18.7511 0.460004C18.867 0.374448 18.9985 0.312529 19.1383 0.277782C19.2781 0.243035 19.4234 0.236141 19.5658 0.257493C19.7083 0.278844 19.8451 0.328025 19.9685 0.402225C20.092 0.476425 20.1996 0.574193 20.2852 0.689945C20.3708 0.805697 20.4328 0.937168 20.4676 1.07685C20.5023 1.21653 20.5092 1.36169 20.4879 1.50404C20.4665 1.64638 20.4173 1.78313 20.343 1.90647C20.2688 2.02981 20.1709 2.13733 20.0551 2.22288L11.152 8.79262C10.9631 8.9317 10.7346 9.00654 10.5 9.00614Z"
											fill="currentColor"
										/>
										<path
											d="M10.5 14.7547C10.2654 14.7551 10.0369 14.6802 9.84802 14.5412L0.944913 7.97142C0.710967 7.79863 0.555294 7.54005 0.51214 7.25257C0.468986 6.96509 0.541886 6.67225 0.714802 6.43848C0.887718 6.20471 1.14649 6.04915 1.43418 6.00603C1.72188 5.96291 2.01493 6.03575 2.24888 6.20854L10.5 12.291L18.7511 6.20854C18.9851 6.03575 19.2781 5.96291 19.5658 6.00603C19.8535 6.04915 20.1123 6.20471 20.2852 6.43848C20.4581 6.67225 20.531 6.96509 20.4879 7.25257C20.4447 7.54005 20.289 7.79863 20.0551 7.97142L11.152 14.5412C10.9631 14.6802 10.7346 14.7551 10.5 14.7547Z"
											fill="currentColor"
										/>
									</svg>
								</div>
							</button>
						</div>
						<div id="required-priority" class="invalid-feedback">This is a required field</div>
					</div>

					<!-- Assigned To -->
					<div class="form-group">
						<label for="exampleFormControlSelect1">Assigned To</label>
						<div class="input-container dropdown">
							<div class="outer-input-btn-container">
								<input id="assign-input" class="form-control assign-input dropdown-toggle" type="text" placeholder="Select contacts to assign" disabled />
								<div class="input-btn-container">
									<div id="assigned-drop-down" class="add-subtaks-plus">
										<img src="./assets/icons/drop-down-btn.png" alt="add a subtask" />
									</div>
									<div id="cancel-confirm-subtask" class="cancel-confirm-subtask">
										<div class="cancel-confirm-subtask-btn">
											<img src="./assets/icons/cancel.png" alt="cancel" />
										</div>
										<div class="vertical-divider"></div>
										<div class="cancel-confirm-subtask-btn">
											<img src="./assets/icons/confirm.png" alt="confirm" />
										</div>
									</div>
								</div>
							</div>

							<div id="drop-down-list-assigned-to-edit-task" class="dropdown-menu container drop-down-list">
								<div id="1.-coworker-box" class="coworker-checkbox-container">
									<label id="coworker-name" class="form-check-label" for="1.-coworker-check">Christian Greenfield</label>
									<input class="form-check-input" type="checkbox" value="" id="1.-coworker-check" />
								</div>
							</div>
						</div>
						<div id="required-assigned-to" class="invalid-feedback">This is a required field</div>
						<div id="taskforce-badge-container" class="container taskforce-badge-container"></div>
					</div>
				</div>
			</div>
		</form>
	
	`;
};
