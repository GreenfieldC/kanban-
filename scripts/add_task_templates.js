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
const generatesAssignedToListWithUsers = (id, name) => {
	const html = /*html*/ `
    <div onclick="selectToggle(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container ">
        <label id="coworker-name" class="form-check-label m-0" for="${id}.-coworker-check">${name}</label>
        <input class="form-check-input checkbox" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	dropDownAssignedToList.insertAdjacentHTML('beforeend', html);
};

/**
 *
 * @param {number} id of logged in user
 * @param {string} name
 */
const generatesAssignedToListElementForLoggedInUser = (id, name) => {
	const html = /*html*/ `
    <div onclick="selectToggle(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container">
        <label id="coworker-name" class="form-check-label m-0" for="${id}.-coworker-check" title="${name}">You</label>
        <input class="form-check-input checkbox" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	dropDownAssignedToList.insertAdjacentHTML('afterbegin', html);
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
	if (!subtaskOnDisplay) return;
	if (subtaskOnDisplay) {
		console.log('hallo here I am');
		checkboxSubtask.disabled = false;
	}
};
