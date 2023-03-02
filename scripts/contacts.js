let elements = [document.getElementById('close-new-contact-btn'), document.getElementById('contacts-overlay')];

const initContacts = () => {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = generateContactsHtml();
};

const renderContacts = () => {
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').innerHTML = generateContactsHtml();
};

/*========================= 
Window Management Contacts 
==========================*/

const openNewContactWindow = () => {
	const newContactWindow = document.getElementById('contacts-overlay');
	newContactWindow.style.display = 'block';
};

const openNewContactBtn = document.getElementById('open-new-contact-btn');
openNewContactBtn.addEventListener('click', openNewContactWindow);

const closeNewContactWindow = () => {
	const newContactWindow = document.getElementById('contacts-overlay');
	newContactWindow.style.display = 'none';
};

const closeNewContactBtn = document.getElementById('close-new-contact-btn');

elements.forEach((e) => e.addEventListener('click', closeNewContactWindow));

/**
 * Prevents the card from closing when clicking inside the card
 */
const newContactsCard = document.getElementById('new-contacts-card');
newContactsCard.addEventListener('click', (e) => e.stopPropagation());
