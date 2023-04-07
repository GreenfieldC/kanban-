'use strict';
let logInUserIndex;

let allTasks = [];
/*
! empty when server installed */
let allUsers = [
	{
		name: 'Guest',
		email: 'guest@web.de',
		password: 'Guest123.-',
		phone: 'N/A',
		initials: 'GG',
		color: '#FF7A00',
	},
	{
		name: 'Aiden Brown',
		email: 'aidenbrown@gmail.com',
		password: 'BrownAiden123',
		phone: '+1-555-555-5555',
		initials: 'AB',
		color: '#E53935',
	},
	{
		name: 'Bart Bardtke',
		email: 'aidrown@gmail.com',
		password: 'BrownAiden123',
		phone: '+1-555-555-5555',
		initials: 'BB',
		color: '#A53935',
	},
	{
		name: 'Chrisitan Babbo',
		email: 'aiown@gmail.com',
		password: 'BrownAiden123',
		phone: '+1-555-555-5555',
		initials: 'CB',
		color: '#E53935',
	},
	{
		name: 'Brandon Carter',
		email: 'brandoncarter@gmail.com',
		password: 'Carter123',
		phone: '+1-555-555-5555',
		initials: 'BC',
		color: '#1E88E5',
	},
	{
		name: 'Connor Davis',
		email: 'connordavis@gmail.com',
		password: 'DavisConnor123',
		phone: '+1-555-555-5555',
		initials: 'CD',
		color: '#43A047',
	},
	{
		name: 'Dylan Evans',
		email: 'dylanevans@gmail.com',
		password: 'EvansDylan123',
		phone: '+1-555-555-5555',
		initials: 'DE',
		color: '#7B1FA2',
	},
	{
		name: 'Ethan Flores',
		email: 'ethanflores@gmail.com',
		password: 'FloresEthan123',
		phone: '+1-555-555-5555',
		initials: 'EF',
		color: '#F57C00',
	},
	{
		name: 'Gabriel Gonzalez',
		email: 'gabrielgonzalez@gmail.com',
		password: 'GonzalezGabriel123',
		phone: '+1-555-555-5555',
		initials: 'GG',
		color: '#546E7A',
	},
	{
		name: 'Hannah Hill',
		email: 'hannahhill@gmail.com',
		password: 'HillHannah123',
		phone: '+1-555-555-5555',
		initials: 'HH',
		color: '#00ACC1',
	},
	{
		name: 'Isaac Johnson',
		email: 'isaacjohnson@gmail.com',
		password: 'JohnsonIsaac123',
		phone: '+1-555-555-5555',
		initials: 'IJ',
		color: '#8E24AA',
	},
	{
		name: 'Jacob King',
		email: 'jacobking@gmail.com',
		password: 'KingJacob123',
		phone: '+1-555-555-5555',
		initials: 'JK',
		color: '#C2185B',
	},
	{
		name: 'Liam Lee',
		email: 'liamlee@gmail.com',
		password: 'LeeLiam123',
		phone: '+1-555-555-5555',
		initials: 'LL',
		color: '#FF5722',
	},
	{
		name: 'Madison Mitchell',
		email: 'madisonmitchell@gmail.com',
		password: 'MitchellMadison123',
		phone: '+1-555-555-5555',
		initials: 'MM',
		color: '#0097A7',
	},
	{
		name: 'Natalie Nguyen',
		email: 'natalienguyen@gmail.com',
		password: 'NguyenNatalie123',
		phone: '+1-555-555-5555',
		initials: 'NN',
		color: '#FFD600',
	},
];

/*
! SERVER */
/**
 * Adds a new user to the users array and saves it to server
 */
async function addUser() {
	users.push('John');
	await backend.setItem('users', JSON.stringify(users));
}

/**
 * Downloads all users from server
 */
async function init() {
	await downloadFromServer();
	users = JSON.parse(backend.getItem('users')) || [];
}

/*
! Local Storage */
/**
 * Saves the index of the logged in user to local storage
 */
const saveLoginUserIndex = async () => {
	let logInUserIndexAsString = JSON.stringify(logInUserIndex);
	localStorage.setItem('userIndex', logInUserIndexAsString);
};

/**
 * Loads the index of the logged in user from local storage
 */
const loadLoginUserIndex = async () => {
	let logInUserIndexAsString = localStorage.getItem('userIndex');
	logInUserIndex = JSON.parse(logInUserIndexAsString);
};

/**
 * Saves all users to local storage
 */
const saveAllUsers = () => {
	let allUsersAsString = JSON.stringify(allUsers);
	localStorage.setItem('allUsers', allUsersAsString);
};

/**
 * Loads all users from local storage
 */
const loadAllUsers = async () => {
	let allUsersAsString = localStorage.getItem('allUsers');
	allUsers = JSON.parse(allUsersAsString);
};

/**
 * Saves all tasks to local storage
 */
const saveAllTasks = () => {
	let allTasksAsString = JSON.stringify(allTasks);
	localStorage.setItem('allTasks', allTasksAsString);
};

/**
 * Loads all tasks from local storage
 */
const loadAllTasks = async () => {
	if (localStorage.getItem('allTasks') === null) return;
	let allTasksAsString = localStorage.getItem('allTasks');
	allTasks = JSON.parse(allTasksAsString);
	console.log(allTasks);
};

const overlay = document.getElementById('overlay');

const loadSideMenuHeader = async () => {
	await includeHTML();
	addSideMenuButtonListener();
};

const includeHTML = async () => {
	let includeElements = document.querySelectorAll('[w3-include-html]');
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		let file = element.getAttribute('w3-include-html');
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = 'Page not found';
		}
	}
};

/**
 * Opens the add Task window
 * @param {string} container
 */
const addTask = async (container) => {
	clearRequiredValues();
	hideInvalidFeedback();
	await initAddTask();
	document.getElementById(container).style.display = 'flex';
	subtaskOnDisplay = false;
	addTaskMainSite = false;
};
