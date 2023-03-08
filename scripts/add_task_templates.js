/**
 * ´Renders the assigned to list
 */
const rendersAssignedToList = () => {
	allUsers.forEach((user, id) => {
		if (id != logInUserIndex) {
			generatesAssignedToListWithUsers(id, user.name);
			console.log(logInUserIndex);
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
    <div id="${id}.-coworker-box" class="coworker-checkbox-container">
        <label id="coworker-name" class="form-check-label" for="${id}.-coworker-check">${name}</label>
        <input class="form-check-input" type="checkbox" value="" id="${id}.-coworker-check" />
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
        <label id="coworker-name" class="form-check-label" for="${id}.-coworker-check">You</label>
        <input class="form-check-input" type="checkbox" value="" id="${id}.-coworker-check" />
    </div>
    `;
	dropDownAssignedToList.insertAdjacentHTML('afterbegin', html);
};
