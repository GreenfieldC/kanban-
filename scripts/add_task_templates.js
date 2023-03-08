/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = () => {
	dropDownAssignedToList.innerHTML = '';
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) {
			generatesAssignedToListWithUsers(id, user.name);
			console.log(id, user.name);
		} else {
			generatesAssignedToListElementForLoggedInUser(id, user.name);
		}
		console.log(id);
		addsEventlisters(id);
	});
};

/**
 * Generates the html for the elements of assigned to list
 * @param {number} id of user in allUsers json
 * @param {string} name of user
 */
const generatesAssignedToListWithUsers = (id, name) => {
	const html = `
    <div id="${id}.-coworker-box" class="coworker-checkbox-container">
        <label id="coworker-name" class="form-check-label" for="${id}.-coworker-check">${name}</label>
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
    <div id="${id}.-coworker-box" class="coworker-checkbox-container" title="${name}">
        <label id="coworker-name" class="form-check-label" for="${id}.-coworker-checkbox">You</label>
        <input class="form-check-input" type="checkbox" value="" id="${id}.-coworker-checkbox" />
    </div>
    `;
	dropDownAssignedToList.insertAdjacentHTML('afterbegin', html);
};

const addsEventlisters = (id) => {
	const coworkerBox = document.getElementById(`${id}.-coworker-box`);
	const checkMark = document.getElementById(`${id}.-coworker-checkbox`);
	togglesCheckMark(coworkerBox, id);
	togglesCheckMark(checkMark, id);
};

/**
 * Toggles the checkmark on and off of checkmark in assigned to list
 * @param {string} container
 * @param {number} id
 */
const togglesCheckMark = (container, id) => {
	container.addEventListener('click', () => {
		const checkMark = document.getElementById(`${id}.-coworker-checkbox`);
		checkMark.checked = !checkMark.checked;
	});
};
