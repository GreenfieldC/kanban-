let elements = [document.getElementById('close-new-contact-btn'), overlay];

const alphabetObj = {};

/**
 * ´Adds alphabet arrays to alphabetObj
 */
for (let i = 65; i <= 90; i++) {
	const letter = String.fromCharCode(i);
	alphabetObj[letter] = [];
}

/**
 * Generates the HTML and for the contacts page
 */
const initContacts = async () => {
	await loadSideMenuHeader();
	await loadAllUsers();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	sortUsers();
	renderContactListExistingContacts();
	document.getElementById('contacts-btn').classList.add('active');
	document.getElementById('bottom-contacts-btn').classList.add('active');
};

/**
 * Renders the contact list
 */
const renderContactListExistingContacts = () => {
	for (let letter in alphabetObj) {
		if (alphabetObj[letter].length > 0) {
			document.getElementById('contact-list').innerHTML += generateLettersStructureHTML(letter);
			appendContactsToLetter(letter);
		}
	}
};

/**
 * Appends/Sorts contacts to the letter
 * @param {string} letter
 */
const appendContactsToLetter = (letter) => {
	const contacts = alphabetObj[letter];
	for (let i = 0; i < contacts.length; i++) {
		const name = contacts[i].name;
		const color = contacts[i].color;
		const email = contacts[i].email;
		const id = contacts[i].id;
		const initials = contacts[i].initials;
		const contactHtml = generateContactInListHtml(i, id, color, initials, name, email);
		const letterElement = document.getElementById(letter);
		letterElement.innerHTML += contactHtml;
	}
};

/**
 * Sorts the users according to the first letter of their surname
 */
const sortUsers = () => {
	allUsers.forEach((user, i) => {
		let id = i;
		const firstLetter = user.initials[1].toUpperCase();
		user.id = id;
		alphabetObj[firstLetter].push(user);
		console.log(user);
	});
};

/* Show Contact on Display (left of contact list/popup) */

/**
 * Shows the contact on the display (right of contact list/ on popup)
 * @param {number} id
 */
const showContact = (id) => {
	const color = allUsers[id].color;
	const initials = allUsers[id].initials;
	const name = allUsers[id].name;
	const email = allUsers[id].email;
	const phone = allUsers[id].phone;
	renderContactOnDisplay(color, initials, name, email, phone);
};

/**
 * Renders the contact on the display (right of contact list/ on popup)
 * @param {string} color
 * @param {string} initials
 * @param {string} name
 * @param {string} email
 * @param {number} phone
 */
const renderContactOnDisplay = (color, initials, name, email, phone) => {
	const contactOnDisplayHtml = generateContactOnDisplayHtml(color, initials, name, email, phone);
	document.getElementById('contact-on-display').innerHTML = contactOnDisplayHtml;
};

/*========================= 
Window Management Contacts 
==========================*/

/**
 * Shows the new contact window
 */
const showsNewContactWindow = () => {
	overlay.style.display = 'block';
};

/**
 * Shows the new contact window
 */
const openNewContactBtn = document.getElementById('open-new-contact-btn');
openNewContactBtn.addEventListener('click', showsNewContactWindow);

/**
 * Hides the new contact window
 */
const hidesNewContactWindow = () => {
	overlay.style.display = 'none';
};

/**
 *!Sollte ich mit oben den Elementen zusammenfassen?
 */
const closeNewContactBtn = document.getElementById('close-new-contact-btn');
elements.forEach((e) => e.addEventListener('click', hidesNewContactWindow));

/**
 * Prevents the card from closing when clicking inside the card
 */
const newContactsCard = document.getElementById('new-contacts-card');
newContactsCard.addEventListener('click', (e) => e.stopPropagation());
