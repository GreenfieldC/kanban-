let elements = [document.getElementById('close-new-contact-btn'), overlay];

/**
 * Generates the HTML for the contacts page
 */
const initContacts = async () => {
	await loadSideMenuHeader();
	document.getElementById('contacts-btn').classList.add('active');
};

/**
 *
 */

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
