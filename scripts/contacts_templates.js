/**
 * @param {string} color
 * @param {string} initials
 * @param {string} userName
 * @param {string} email
 * @returns
 */
const generateContactInListHtml = (i, id, color, initials, userName, email) => {
	return /*html*/ `
	<div class="card card-contact-list" id="${i}" onclick="showContact(${id})">
		<div class="card-body align-items-center outer-card-body">
			<div class="initials-container" style="background-color: ${color}">
				<span class="user-initials">${initials}</span>
			</div>
			<div class="card-body flex-column right-body-contact-card">
				<span class="user-name" id="user-name">${userName}</span>
				<span class="email">${email}</span>
			</div>
		</div>
	</div>
	`;
};

/**
 * Generates the HTML for the letters structure for contact list
 * @param {string} letter
 * @returns
 */
const generateLettersStructureHTML = (letter) => {
	return /*html*/ `
        <div class="letters">
            <span><b>${letter}</b></span>
        </div>
        <div id='${letter}'></div> 
    `;
};

/**
 * Generates the HTML for the contact on display
 * @param {string} color
 * @param {string} initials
 * @param {string} name
 * @param {string} email
 * @param {number} phone
 * @returns {string} HTML for contact on display (right of contact list/ on popup)
 */
const generateContactOnDisplayHtml = (id, color, initials, name, email, phone) => {
	return /*html*/ `
	<div class="container-bagdge-name-add-task">
		<div class="initials-container initals-in-details-section" style="background-color:${color};">
			<span id="user-initals-details" class="user-initials user-initials-details">${initials}</span>
		</div>
		<div class="container-name-add-task">
			<span id="details-name" class="details-name">${name}</span>
			<div  class="container-add-task-img-text">
				<span onclick="addTask('add-task-overlay',workflow='todo')" id="add-task-btn" class="add-Task-in-contacts">&plus; Add Task</span>
			
			</div>
		</div>
	</div>
	<div class="contact-information-section">
		<!-- Upper Part Display Contact Information -->
		<div class="wrapper-upper-part-contact-information">
			<h3 class="contact-information-text">Contact Information</h3>
			<div onclick="openEditContact(${id})" class="edit-text-img">
				<img src="./assets/icons/pen_black.png" alt="edit contact" />
				<span>Edit contact</span>
			</div>
		</div>

		<!-- Lower Part Display Contact Information-->

		<div class="wrapper-lower-part-contact-information">
			<div class="email-phone-details">
				<span class="email-phone-details-text">Email</span>
				<a id="email-details" class="email-details" href="mailto:${email}">${email}</a>
			</div>
			<div class="email-phone-details">
				<span class="email-phone-details-text">Phone</span>
				<a id="phone-details" class="phone-details" href="tel:${phone}">${phone}</a>
			</div>
		</div>
	</div>
	
	`;
};
