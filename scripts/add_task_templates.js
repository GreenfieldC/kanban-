/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = () => {
	dropDownAssignedToList.innerHTML = '';
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) {
			generatesAssignedToListWithUsers(id, user.name);
		} else {
			generatesAssignedToListElementForLoggedInUser(id, user.name);
		}
	});
};

/**
 * Generates the html for the elements of assigned to list
 * @param {number} id of user in allUsers json
 * @param {string} name of user
 */
const generatesAssignedToListWithUsers = (id, name) => {
	const html = `
    <div onclick="togglesCheckMark(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container ">
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
	const html = `
    <div onclick="togglesCheckMark(${id})" id="${id}.-coworker-box" class="coworker-checkbox-container">
        <label id="coworker-name" class="form-check-label m-0" for="${id}.-coworker-check" title="${name}">You</label>
        <input class="form-check-input checkbox" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	dropDownAssignedToList.insertAdjacentHTML('afterbegin', html);
};

/**
 * Toggles the checkmark on and off of checkmark in assigned to list
 * @param {number} id
 */
const togglesCheckMark = (id) => {
	let checkMark = document.getElementById(`${id}.-coworker-checkbox`);
	checkMark.checked = !checkMark.checked;
	console.log(id);
};
