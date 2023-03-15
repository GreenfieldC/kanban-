/*
!===Select Category ===*/

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
