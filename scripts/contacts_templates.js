/**
 * @param {string} color
 * @param {string} initials
 * @param {string} userName
 * @param {string} email
 * @returns
 */
const generateContactInListHtml = (i, id, color, initials, userName, email) => {
	return /*html*/ `
	<div class="card card-contact-list" id="${i}" style="width: 18rem" onclick="showContact(${id})">
		<div class="card-body align-items-center outer-card-body">
			<div class="initials-container" style="background-color: ${color}">
				<span class="user-initials">${initials}</span>
			</div>
			<div class="card-body flex-column right-body-contact-card">
				<span class="user-name" id="user-name">${userName}</span>
				<span id="email" class="email">${email}</span>
			</div>
		</div>
	</div>
	`;
};
