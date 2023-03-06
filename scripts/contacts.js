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
 * Generates the HTML for the contacts page
 */
const initContacts = async () => {
	await loadSideMenuHeader();
	await loadAllUsers();
	sortUsers();
	renderContactListExistingContacts();
	document.getElementById('contacts-btn').classList.add('active');
	document.getElementById('bottom-contacts-btn').classList.add('active');
};

/**
 * Renders the contact list
 */
/* Order List according first letter */

/**
 * @param {string} letter
 */
const renderContactListExistingContacts = () => {
	for (let letter in alphabetObj) {
		if (alphabetObj[letter].length > 0) {
			document.getElementById('contact-list').innerHTML += generateLettersStructureHTML(letter);
			for (let i = 0; i < alphabetObj[letter].length; i++) {
				let name = alphabetObj[letter][i].name;
				let color = alphabetObj[letter][i].color;
				let email = alphabetObj[letter][i].email;
				let id = alphabetObj[letter][i].id;
				let initials = alphabetObj[letter][i].initials;
				document.getElementById(letter).innerHTML += generateContactInListHtml(i, id, color, initials, name, email);
			}
		}
	}
};

/**
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

/* Cards */
const renderContactList = () => {
	const contactList = document.getElementById('contact-list');
	contactList.innerHTML = '';
	allUsers.forEach((user) => {
		const color = user.color;
		const initials = user.initials;
		const userName = user.name;
		const email = user.email;
		const contactHtml = generateContactInListHtml(color, initials, userName, email);
		contactList.innerHTML += contactHtml;
	});
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
