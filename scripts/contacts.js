let elements = [document.getElementById('close-new-contact-btn'), overlay];

/**
 * Generates the HTML for the contacts page
 */
const initContacts = async () => {
	await loadSideMenuHeader();
	await loadAllUsers();
	renderContactList();
	document.getElementById('contacts-btn').classList.add('active');
	document.getElementById('bottom-contacts-btn').classList.add('active');
};

/**
 * Renders the contact list
 */
const renderContactList = () => {
	const contactList = document.getElementById('contact-list');
	contactList.innerHTML = '';
	allUsers.forEach((user) => {
		const color = user.color;
		const initials = user.initials;
		const userName = user.name;
		const email = user.email;
		const contactHtml = generateContactsHtml(color, initials, userName, email);
		contactList.innerHTML += contactHtml;
	});
};

/**
 * @param {string} color
 * @param {string} initials
 * @param {string} userName
 * @param {string} email
 * @returns
 */
const generateContactsHtml = (color, initials, userName, email) => {
	return /*html*/ `
	<div class="card card-contact-list" style="width: 18rem">
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

/*========================= 
Window Management Contacts 
==========================*/

const openNewContactWindow = () => {
	overlay.style.display = 'block';
};

const openNewContactBtn = document.getElementById('open-new-contact-btn');
openNewContactBtn.addEventListener('click', openNewContactWindow);

const closeNewContactWindow = () => {
	overlay.style.display = 'none';
};

const closeNewContactBtn = document.getElementById('close-new-contact-btn');
elements.forEach((e) => e.addEventListener('click', closeNewContactWindow));

/**
 * Prevents the card from closing when clicking inside the card
 */
const newContactsCard = document.getElementById('new-contacts-card');
newContactsCard.addEventListener('click', (e) => e.stopPropagation());

const renderNewContactCard = () => {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = generateNewContactCardHtml();
};
